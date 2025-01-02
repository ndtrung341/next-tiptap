import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useCodeMirror } from "./useCodeMirror";
import { formatHtml } from "./format";
import "./CodeMirror.scss";

interface SourceEditorProps {
  initialContent: string;
  onChange?: (content: string) => void;
}

const SourceEditor = forwardRef<HTMLDivElement, SourceEditorProps>(
  ({ initialContent, onChange }, ref) => {
    const [formattedContent, setFormattedContent] = useState<string>("");
    const editorRef = useCodeMirror({
      initialContent: formattedContent,
      onChange,
    });

    useEffect(() => {
      formatHtml(initialContent).then(setFormattedContent);
    }, [initialContent]);

    useImperativeHandle(ref, () => editorRef.current!, [editorRef]);

    return <div ref={editorRef} />;
  }
);

SourceEditor.displayName = "SourceEditor";

export default SourceEditor;
