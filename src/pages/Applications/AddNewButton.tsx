import AddForm from "./AddForm";

function AddNewButton() {
  const openModal = () => {
    const modal = document.getElementById(
      "add-app-modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(
      "add-app-modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Add New
      </button>
      <dialog id="add-app-modal" className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add New Application</h3>
          <AddForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddNewButton;
