import clsx from "clsx";
import AddForm from "./Form";
import { useState } from "react";

export default function ModalButton() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={toggleModal}>
        Add Application
      </button>
      <dialog
        id="add-app-modal"
        className={clsx("modal", isModalOpen && "modal-open")}
      >
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={toggleModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Application</h3>
          <AddForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={toggleModal}>close</button>
        </form>
      </dialog>
    </>
  );
}
