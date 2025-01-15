import { useMemo, useState } from "react";
import ModalButton from "../Add/ModalButton";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { usePaginatedApplications } from "./queries";
import Pagination from "./Pagination";
import FileModal, { FileModalState, FileType } from "./FileModal";
import { useSelect } from "./useSelect";
import { CircleMinus } from "lucide-react";
import {
  ApplicationSortableField,
  SortDirection,
} from "../../../../domain/models/application";
import FilterButton from "../Filter/FilterButton";
import FilterRow from "../Filter/FilterRow";

export default function List() {
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<FileModalState | null>(null);
  const [sort, setSort] = useState<
    | {
        sortBy: ApplicationSortableField;
        directionStr: SortDirection;
      }
    | undefined
  >(undefined);

  const limit = 5; // Number of items per page

  const { data, isLoading } = usePaginatedApplications(page, limit, sort);

  const ids = useMemo(() => {
    if (isLoading || !data?.applications) {
      return [];
    }
    return data.applications.map((app) => app.id!);
  }, [data?.applications, isLoading]);

  const { handleSelect, handleSelectAll, selectAllState, selectedItems } =
    useSelect(ids, isLoading);

  const selectedIds = useMemo(() => {
    return Object.keys(selectedItems);
  }, [selectedItems]);

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleModalOpen = (state: FileModalState) => {
    setModalState(state);
  };

  const handleSort = (sortBy: ApplicationSortableField) => {
    setSort((prev) => {
      if (prev?.sortBy === sortBy) {
        return prev.directionStr === "asc"
          ? { sortBy, directionStr: "desc" }
          : undefined;
      } else {
        return { sortBy, directionStr: "asc" };
      }
    });
  };

  return (
    <>
      <div className="card w-full h-full min-h-fit bg-primary bg-opacity-80 border border-opacity-10 overflow-hidden">
        <div className="flex w-full justify-between p-4">
          <h2 className="card-title text-primary-content">Applications</h2>
          <span className="flex gap-2">
            {selectedIds.length > 0 ? (
              <button
                aria-label={"Delete " + selectedIds.length + "applications"}
                className="btn btn-error gap-1"
              >
                <span className="hidden sm:flex">Delete</span>
                {"(" + selectedIds.length + ")"}
                <CircleMinus />
              </button>
            ) : (
              <>
                <FilterButton />
                <ModalButton />
              </>
            )}
          </span>
        </div>
        <FilterRow />
        <div className="overflow-x-auto bg-base-100">
          <table className="table min-h-[29rem]">
            <TableHeader
              onSort={handleSort}
              onSelectAll={handleSelectAll}
              selectAllState={selectAllState}
              sortData={sort}
            />
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={8} className="p-0 relative">
                    <progress className="progress absolute inset-x-0 bottom-0 w-full"></progress>
                  </td>
                </tr>
              )}
              {data?.applications?.map((d) => (
                <TableRow
                  key={d.id}
                  onSelect={() => handleSelect(d.id!)}
                  isSelected={selectedItems[d.id!]}
                  data={d}
                  onModalOpen={(id: string, type: FileType) =>
                    handleModalOpen({
                      id,
                      type,
                      link: type === "cv" ? d.cv.link : d.coverLetter?.link,
                    })
                  }
                />
              ))}
              <tr className="flex-1 h-full" />
            </tbody>
          </table>
        </div>
        <Pagination
          disabled={isLoading}
          page={page}
          totalPages={data?.totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
      <FileModal onChange={() => setModalState(null)} modalState={modalState} />
    </>
  );
}
