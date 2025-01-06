import {useEffect, useState} from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    document.body.style.paddingRight = "16px";
  };

  const handleClose = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { open, handleOpen, handleClose };
}