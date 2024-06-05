import React from "react";
import { Toolbar } from "../ui/toolbar";
import { Icon } from "../ui/icon";

interface LinkPanelPreviewProps {
  url: string;
  onEdit: () => void;
  onRemove: () => void;
}

const LinkPanelPreview = ({ url, onEdit, onRemove }: LinkPanelPreviewProps) => {
  return (
    <div className="rounded-md border bg-white text-black shadow-md outline-none px-3 py-2">
      <div className="flex items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm link  text-blue-500 underline font-medium"
        >
          <span className="min-w-[9rem] flex items-center w-full text-ellipsis overflow-hidden">
            {url}
          </span>
        </a>
        <Toolbar.Divider className="h-full" />
        <Toolbar.Group>
          <Toolbar.Button onClick={onEdit}>
            <Icon name="Pen" className="w-[18px] h-6" />
          </Toolbar.Button>
          <Toolbar.Button onClick={onRemove}>
            <Icon name="Link2Off" className="w-[18px] h-6" />
          </Toolbar.Button>
        </Toolbar.Group>
      </div>
    </div>
  );
};

export default LinkPanelPreview;
