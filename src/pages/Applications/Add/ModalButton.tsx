import AddForm from "./Form";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import Modal from "../../../components/Modal";

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
      <Modal
        title="Add New Application"
        isOpen={isModalOpen}
        onModalStateChange={setModalState}
      >
        <AddForm onSubmit={() => setModalState(false)} />
      </Modal>
    </>
  );
}
