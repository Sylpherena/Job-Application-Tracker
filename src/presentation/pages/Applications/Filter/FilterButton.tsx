import { Filter } from "lucide-react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import FilterForm from "./Form";
import clsx from "clsx";

export default function FilterButton() {
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="z-10"
        tabIndex={-1}
        onBlur={(e) => e.relatedTarget === null && setFilterOpen(false)}
      >
        <div
          role="button"
          className="btn btn-secondary"
          onClick={() => setFilterOpen(true)}
        >
          <span className="flex gap-2">
            <span className="hidden sm:flex">Filter</span>
            <Filter className="h-4 w-4" strokeWidth={3} />
          </span>
        </div>
        <form
          className={clsx(
            "hidden rounded-box z-[1] w-fit shadow text-bold bg-base-100 -translate-x-2/3",
            isFilterOpen && "sm:menu sm:absolute "
          )}
          onSubmit={(e) => {
            e.preventDefault();
            setFilterOpen(false);
          }}
        >
          <FilterForm />
        </form>
      </div>
      <Modal
        className="sm:hidden"
        isOpen={isFilterOpen}
        onModalStateChange={() => setFilterOpen((prev) => !prev)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilterOpen(false);
          }}
        >
          <FilterForm />
        </form>
      </Modal>
    </>
  );
}
