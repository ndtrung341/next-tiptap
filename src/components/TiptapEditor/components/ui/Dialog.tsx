import React from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ children, open,  onOpenChange }: DialogProps) => {
  const onDismiss = () => {
    onOpenChange?.(false);
  };

  if (!open) return;

  return createPortal(
    <div role="dialog" className="rte-dialog" onClick={onDismiss}>
      <div className="rte-dialog__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector("body")!
  );
};

export default Dialog;
