import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { findChildren } from "@tiptap/core";
import { loadLanguage } from "../../utils/codeLanguageLoader";
import highlight from "highlight.js/lib/core";
import { CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT } from "../../constants/code-languages";

export const LowlightPluginKey = new PluginKey("lowlight");

export function LowlightPlugin({
  name,
  lowlight,
  defaultLanguage,
}: {
  name: string;
  lowlight: any;
  defaultLanguage: string | null | undefined;
}) {
  const lowlightPlugin: Plugin<any> = new Plugin({
    key: LowlightPluginKey,

    state: {
      init(_, { doc }) {
        return getDecorations({
          doc,
          name,
          lowlight,
          defaultLanguage,
        });
      },

      apply(tr, decorationSet, oldState, newState) {
        const oldNodeName = oldState.selection.$head.parent.type.name;
        const newNodeName = newState.selection.$head.parent.type.name;
        const oldNodes = findChildren(oldState.doc, (node) => node.type.name === name);
        const newNodes = findChildren(newState.doc, (node) => node.type.name === name);

        const didChangeSomeCodeBlock =
          tr.docChanged &&
          // Apply decorations if:
          // selection includes named node,
          ([oldNodeName, newNodeName].includes(name) ||
            // OR transaction adds/removes named node,
            newNodes.length !== oldNodes.length ||
            // OR transaction has changes that completely encapsulte a node
            // (for example, a transaction that affects the entire document).
            // Such transactions can happen during collab syncing via y-prosemirror, for example.
            tr.steps.some((step) => {
              return (
                // @ts-ignore
                step.from !== undefined &&
                // @ts-ignore
                step.to !== undefined &&
                oldNodes.some((node) => {
                  return (
                    // @ts-ignore
                    node.pos >= step.from &&
                    // @ts-ignore
                    node.pos + node.node.nodeSize <= step.to
                  );
                })
              );
            }));

        const languageLoaded = Boolean(tr.getMeta(LowlightPluginKey));
        // only create code decoration when it's necessary to do so
        if (languageLoaded || didChangeSomeCodeBlock) {
          return getDecorations({
            doc: tr.doc,
            name,
            lowlight,
            defaultLanguage,
          });
        }

        return decorationSet.map(tr.mapping, tr.doc);
      },
    },

    view(view) {
      class LowlightPluginView {
        constructor() {
          this.initDecorations();
        }

        update() {
          this.checkUndecoratedBlocks();
        }

        async initDecorations() {
          const doc = view.state.doc;
          const codeBlocks = findChildren(doc, (node) => node.type.name === name);

          const languages = [
            ...codeBlocks.map(
              (block) => block.node.attrs.language || CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT
            ),
            defaultLanguage,
          ];

          await Promise.all(languages.map((language) => loadLanguage(language, lowlight)));

          const tr = view.state.tr.setMeta(LowlightPluginKey, true);
          view.dispatch(tr);
        }

        async checkUndecoratedBlocks() {
          const codeBlocks = findChildren(view.state.doc, (node) => node.type.name === name);

          // Load missing themes or languages when necessary.
          // loadStates is an array with booleans depending on if a theme/lang
          // got loaded.
          const loadStates = await Promise.all(
            codeBlocks.flatMap((block) => [
              loadLanguage(
                block.node.attrs.language || CODE_BLOCK_LANGUAGUE_SYNTAX_DEFAULT,
                lowlight
              ),
            ])
          );
          const didLoadSomething = loadStates.includes(true);

          // The asynchronous nature of this is potentially prone to
          // race conditions. Imma just hope it's fine lol
          if (didLoadSomething) {
            const tr = view.state.tr.setMeta(LowlightPluginKey, true);
            view.dispatch(tr);
          }
        }
      }

      return new LowlightPluginView();
    },

    props: {
      decorations(this, state) {
        return this.getState(state);
      },
    },
  });

  return lowlightPlugin;
}

function parseNodes(nodes: any[], className: string[] = []): { text: string; classes: string[] }[] {
  return nodes
    .map((node) => {
      const classes = [...className, ...(node.properties ? node.properties.className : [])];

      if (node.children) {
        return parseNodes(node.children, classes);
      }

      return {
        text: node.value,
        classes,
      };
    })
    .flat();
}

function getHighlightNodes(result: any) {
  // `.value` for lowlight v1, `.children` for lowlight v2
  return result.value || result.children || [];
}

function registered(aliasOrLanguage: string) {
  return Boolean(highlight.getLanguage(aliasOrLanguage));
}

function getDecorations({
  doc,
  name,
  lowlight,
  defaultLanguage,
}: {
  doc: ProsemirrorNode;
  name: string;
  lowlight: any;
  defaultLanguage: string | null | undefined;
}) {
  const decorations: Decoration[] = [];

  const codeBlocks = findChildren(doc, (node) => node.type.name === name);

  codeBlocks.forEach((block) => {
    let from = block.pos + 1;
    const language = block.node.attrs.language || defaultLanguage;
    const languages = lowlight.listLanguages();

    const nodes =
      language && (languages.includes(language) || registered(language))
        ? getHighlightNodes(lowlight.highlight(language, block.node.textContent))
        : getHighlightNodes(lowlight.highlightAuto(block.node.textContent));

    parseNodes(nodes).forEach((node) => {
      const to = from + node.text.length;

      if (node.classes.length) {
        const decoration = Decoration.inline(from, to, {
          class: node.classes.join(" "),
        });

        decorations.push(decoration);
      }

      from = to;
    });
  });

  return DecorationSet.create(doc, decorations);
}
