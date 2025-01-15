import clsx from "clsx";
import React from "react";

interface ModalProps extends React.PropsWithChildren {
  className?: string;
  isOpen: boolean;
  onModalStateChange: (isOpen: boolean) => void;
  title?: string;
}

export default function Modal(props: ModalProps) {
  const {
    className,
    isOpen = false,
    onModalStateChange,
    title,
    children,
  } = props;

  return (
    <dialog
      className={clsx(
        "modal modal-bottom sm:modal-middle",
        isOpen && "modal-open",
        className
      )}
    >
      <div className="modal-box p-4 sm:p-6">
        <button
          aria-label="Return to previous page"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => onModalStateChange(false)}
        >
          ✕
        </button>
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          aria-label="Return to previous page"
          onClick={() => onModalStateChange(false)}
        >
          Close
        </button>
      </form>
    </dialog>
  );
}
