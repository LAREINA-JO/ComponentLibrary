import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactElement,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

type IModalContext = {
  modalName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<IModalContext>({
  modalName: '',
  open: () => {},
  close: () => {},
});

type CompoundedModalProps = {
  children: React.ReactNode;
};

const CompoundedModal: React.FC<CompoundedModalProps> = ({
  children,
}: CompoundedModalProps) => {
  const [modalName, setModalName] = useState('');
  const close = () => setModalName('');
  const open = (name: string) => setModalName(name);

  useEffect(() => {
    if (modalName === '') {
      // modal not open
      document.body.style.removeProperty('overflow');
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [modalName]);

  return (
    <ModalContext.Provider value={{ modalName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

export default CompoundedModal;

type CompoundedModalTriggerProps = {
  children: React.ReactElement;
  modalName: string;
};
export const CompoundedModalTrigger = ({
  children,
  modalName,
}: CompoundedModalTriggerProps) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(modalName) });
};

type CompoundedModalWindowProps = JSX.IntrinsicElements['div'] & {
  modalName: string;
  children: ReactElement;
};

export const CompoundedModalWindow = ({
  children,
  modalName,
  className,
}: CompoundedModalWindowProps) => {
  const { modalName: openModalName, close } = useContext(ModalContext);

  if (modalName !== openModalName) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent) => {
    e.stopPropagation();
    close();
  };

  return createPortal(
    <div
      className={twMerge(
        clsx(
          'fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40',
        ),
      )}
      onClick={handleOverlayClick}
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
        {cloneElement(children, { onCloseModal: () => close() })}
      </div>
    </div>,
    document.body,
  );
};
