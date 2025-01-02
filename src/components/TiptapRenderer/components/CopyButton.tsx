"use client";

import React, { useState } from "react";
import { LuCheck, LuClipboard } from "react-icons/lu";

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 bg-transparent p-2 z-20 invisible group-hover:visible"
    >
      {copied ? <LuCheck size={18} /> : <LuClipboard size={18} />}
    </button>
  );
};

export default CopyButton;
