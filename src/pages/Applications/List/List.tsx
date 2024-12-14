import { useCallback } from "react";
import { getApplicationsPaginated } from "../../../localDB/dbConfig";
import { useFetch } from "../../../utils/useFetch";
import ModalButton from "../Add/ModalButton";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function List() {
  const handleFetch = useCallback(async () => {
    const result = await getApplicationsPaginated(1, 5);
    return result;
  }, []);
  const { data, loading } = useFetch(handleFetch);

  return (
    <div className="card w-full h-full bg-primary bg-opacity-20 border border-opacity-10 overflow-hidden">
      <div className="flex w-full justify-between p-4">
        <h2 className="card-title">Applications</h2>
        <ModalButton />
      </div>
      <div className="overflow-x-none bg-base-100 h-[452px]">
        <table className="table table-zebra overflow-x-auto">
          <TableHeader />
          <tbody>
            {loading && <p>Loading...</p>}
            {data?.applications?.map((d) => <TableRow data={d} />)}
          </tbody>
          {/* foot */}
          <tfoot></tfoot>
        </table>
      </div>
      <div className="join w-full flex justify-center p-2">
        <button className="join-item btn bg-base-100">«</button>
        <button className="join-item btn bg-base-100">Page 22</button>
        <button className="join-item btn bg-base-100">»</button>
      </div>
    </div>
  );
}
