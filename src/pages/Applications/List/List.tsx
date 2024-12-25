import { useState } from "react";
import ModalButton from "../Add/ModalButton";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { usePaginatedApplications } from "./queries";
import Pagination from "./Pagination";
import FileModal, { FileModalState, FileType } from "./FileModal";

export default function List() {
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<FileModalState | null>(null);

  const limit = 5; // Number of items per page

  const { data, isLoading } = usePaginatedApplications(page, limit);

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleModalOpen = (state: FileModalState) => {
    setModalState(state);
  };

  return (
    <>
      <div className="card w-full h-full min-h-fit bg-primary bg-opacity-30 border border-opacity-10 overflow-hidden">
        <div className="flex w-full justify-between p-4">
          <h2 className="card-title">Applications</h2>
          <ModalButton />
        </div>
        <div className="overflow-x-auto bg-base-100">
          <table className="table min-h-[29rem]">
            <TableHeader />
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
