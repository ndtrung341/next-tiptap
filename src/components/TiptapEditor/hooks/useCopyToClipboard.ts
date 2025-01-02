import { useEffect, useRef, useState } from "react";

export default function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const copy = async (value: string) => {
    if (isCopied) return;

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      timeoutId.current = setTimeout(() => setIsCopied(false), 2500);
    } catch (error) {
      console.log(error);
      setIsCopied(false);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return { isCopied, copy };
}
