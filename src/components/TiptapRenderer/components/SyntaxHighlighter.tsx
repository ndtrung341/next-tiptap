"use client";

import { useLayoutEffect, useState } from "react";
import { highlight } from "../utils/highlight";

interface SyntaxHighlighterProps {
  content?: string;
  language?: string;
}

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
  const [nodes, setNodes] = useState<any>(null);

  useLayoutEffect(() => {
    highlight(props.content!, props.language!).then(setNodes);
  }, []);

  if (!nodes) return <code {...props}>{props.content}</code>;

  return nodes;
};

export default SyntaxHighlighter;
