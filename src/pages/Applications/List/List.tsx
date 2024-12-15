import { useState } from "react";
import ModalButton from "../Add/ModalButton";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { usePaginatedApplications } from "./queries";

export default function List() {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of items per page

  const { data, isLoading } = usePaginatedApplications(page, limit);

  return (
    <div className="card w-full h-full bg-primary bg-opacity-30 border border-opacity-10 overflow-hidden">
      <div className="flex w-full justify-between p-4">
        <h2 className="card-title">Applications</h2>
        <ModalButton />
      </div>
      <div className="overflow-x-auto bg-base-100 h-[29rem]">
        <table className="table overflow-x-auto overflow-y-none">
          <TableHeader />
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="p-0 relative">
                  <progress className="progress absolute inset-x-0 bottom-0 w-full"></progress>
                </td>
              </tr>
            )}
            {data?.applications?.map((d) => <TableRow key={d.id} data={d} />)}
          </tbody>
          {/* TODO Add foot or delete*/}
          <tfoot></tfoot>
        </table>
      </div>
      <div className="join w-full flex justify-center p-2">
        <button
          disabled={page === 1}
          className="join-item btn bg-base-100"
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          «
        </button>
        <button className="join-item btn bg-base-100 cursor-default hover:bg-base-100">
          {"Page " + page}
        </button>
        <button
          className="join-item btn bg-base-100"
          disabled={data?.totalPages === page}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
