import clsx from "clsx";
import AddForm from "./Form";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

export default function ModalButton() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const setModalState = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setModalState(true)}>
        Add Application
        <CirclePlus />
      </button>
      <dialog
        id="add-app-modal"
        className={clsx("modal", isModalOpen && "modal-open")}
      >
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setModalState(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Application</h3>
          <AddForm onSubmit={() => setModalState(false)} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setModalState(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}
