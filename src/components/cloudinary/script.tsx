import React, { useEffect } from 'react';

interface LoadScriptProps {
  src: string;
  onLoad?: () => void;
  onError?: () => void;
}

const Script = ({ src, onError, onLoad }: LoadScriptProps) => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) return;
    const script = document.createElement('script');

    script.async = true;
    script.src = src;

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError!);
      document.body.removeChild(script);
    };
  }, [src, onLoad, onError]);

  return <></>;
};

export default Script;
