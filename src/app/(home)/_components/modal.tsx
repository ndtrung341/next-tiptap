import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = ({ children, open, setOpen }: ModalProps) => {
  const onDismiss = () => {
    setOpen(false);
  };

  if (!open) return;

  return createPortal(
    <div
      className='bg-black/30 dark:bg-white/5 backdrop-blur-sm fixed inset-0'
      onClick={onDismiss}
    >
      <div className='overflow-auto h-full text-center after:content-[""] after:inline-block after:align-middle after:h-full after:w-0'>
        <div
          className='max-w-screen-xl w-full mx-auto m-8 align-middle relative text-left inline-block'
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('body')!
  );
};

export default Modal;
