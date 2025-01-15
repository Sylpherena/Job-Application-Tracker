import { Filter } from "lucide-react";
import { useState } from "react";
import Modal from "../../../components/Modal";

export default function FilterButton() {
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const setFilterState = (isOpen: boolean) => {
    setFilterOpen(isOpen);
  };

  return (
    <>
      <button
        aria-label="Add Application"
        className="btn btn-secondary sm:dropdown sm:dropdown-bottom sm:dropdown-end z-10"
        onClick={() => setFilterState(true)}
      >
        <span className="flex gap-2">
          <span className="hidden sm:flex">Filter</span>
          <Filter className="h-4 w-4" strokeWidth={3} />
        </span>
        <ul
          tabIndex={0}
          className="hidden sm:menu dropdown-content rounded-box z-[1] w-52 shadow text-bold bg-base-100"
        >
          <li className="border-t-2 text-black">Settings</li>
        </ul>
      </button>
      <Modal
        className="sm:hidden"
        isOpen={isFilterOpen}
        onModalStateChange={() => setFilterOpen((prev) => !prev)}
      >
        test
      </Modal>
    </>
  );
}
