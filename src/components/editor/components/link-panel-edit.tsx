import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";

interface LinkPanelEditProps {
  initial: string;
  isOpen: boolean;
  onSetLink: (url: string) => void;
}

const LinkPanelEdit = ({ initial, isOpen, onSetLink }: LinkPanelEditProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>(initial || "");

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url);
      }
    },
    [url, isValidUrl, onSetLink]
  );

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-md border bg-popover text-popover-foreground p-2 shadow-md">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 cursor-text">
          <Icon name="Link" className="flex-none text-black size-4" />
          <input
            ref={inputRef}
            type="url"
            className="flex-1 bg-transparent outline-none text-black text-sm font-sans"
            placeholder="Enter URL"
            value={url}
            onChange={onChange}
          />
        </label>
        <Button color="primary" size="sm" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default LinkPanelEdit;
