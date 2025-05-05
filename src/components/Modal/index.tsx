import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

type ModalProps = JSX.IntrinsicElements['div'] & {
  open?: boolean;
  /**
   *
   * update open to false outside
   */
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  className,
  open,
  children,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      // modal not open
      document.body.style.removeProperty('overflow');
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={twMerge(
        clsx(
          'animate-fadeIn fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40',
        ),
      )}
      onClick={onClose}
    >
      <div
        className={twMerge(
          '-mt-[100px] max-w-xl space-y-10 rounded-md bg-white p-10',
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
