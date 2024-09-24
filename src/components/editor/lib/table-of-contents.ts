import { EditorInstance } from '..';
import { slugify } from './utils';

export type TocItem = {
  id: string;
  text: string;
  level: number;
  node: Element;
};

export type ToCObject = TocItem & {
  children: ToCObject[];
};

export class TOC {
  parent: TOC | null = null;
  children: TOC[] = [];

  constructor(
    private id: string,
    private text: string,
    private node: Element
  ) {}

  get level(): number {
    return this.parent ? this.parent.level + 1 : 1;
  }

  addChild(id: string, text: string, node: Element) {
    const child = new TOC(id, text, node);
    child.parent = this;
    this.children.push(child);
    return child;
  }

  flatten() {
    this.children.forEach((child) => child.flatten());

    if (!this.text && this.parent) {
      const index = this.parent.children.indexOf(this);
      this.parent.children.splice(index, 1, ...this.children);
      this.children.forEach((child) => (child.parent = this.parent));
    }

    return this;
  }

  toObject(): ToCObject {
    return {
      id: this.id,
      text: this.text,
      level: this.level,
      node: this.node,
      children: this.children.map((child) => child.toObject())
    };
  }
}

function fillEmpty(headings: any[]) {
  for (let i = 0; i < headings.length; i++) {
    let level = headings[i - 1]?.level || 1;
    if (headings[i].level - level > 1) {
      while (level < headings[i].level) {
        headings.splice(i, 0, { level: level + 1, text: '' });
        level++;
      }
    }
  }
}

function createTree(headings: any[], depth: number) {
  fillEmpty(headings);

  const tree = new TOC('', '', null);
  let current = tree;

  for (const heading of headings) {
    while (current.level >= heading.level && current.parent)
      current = current.parent;
    current = current.addChild(heading.id, heading.text, heading.node);
  }
  return flatten(tree.flatten().toObject(), depth);
}

function flatten(toc: ToCObject, depth: number): TocItem[] {
  const items = [];

  for (const item of toc.children) {
    if (item.level > depth) return;
    const { children, ...rest } = item;
    items.push(rest, ...flatten(item, depth));
  }

  return items;
}

export function getToCItems(editor: EditorInstance, depth: number = 3) {
  const headings: any[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const id = slugify(node.textContent);

      if (node.attrs.id !== id) {
        const transaction = editor.state.tr;

        transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          id: id
        });

        transaction.setMeta('addToHistory', false);
        transaction.setMeta('preventUpdate', true);
        editor.view.dispatch(transaction);
      }

      headings.push({
        id,
        level: node.attrs.level,
        text: node.textContent,
        node: editor.view.nodeDOM(pos)
      });
    }
  });

  return createTree(headings, depth);
}
