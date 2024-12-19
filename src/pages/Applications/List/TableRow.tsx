import { Application } from "../../../localDB/types";
import clsx from "clsx";
import { formatFileName } from "../../../utils/utils";

type Props = {
  data: Application;
  onModalOpen: (id: string, type: "cl" | "cv") => void;
};

export default function TableRow(props: Props) {
  const { data, onModalOpen } = props;

  const onCVFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onModalOpen(data.cv.id, "cv");
  };

  const onCLFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onModalOpen(data.coverLetter!.id, "cl");
  };

  return (
    <tr
      className="h-20 hover:bg-primary hover:bg-opacity-10"
      onClick={() => {
        console.log("clicked");
      }}
    >
      <td>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </td>
      <td>{new Date(data.applicationDate).toLocaleDateString()}</td>
      <td>
        <div className="font-bold">{data.company}</div>
      </td>
      <td>{data.position}</td>
      <td>
        <div className="flex justify-center items-center">
          {data.country ? data.country : "-"}
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center">
          {data.location ? data.location : "-"}
        </div>
      </td>
      <td>
        <div
          className="flex gap-2 items-center tooltip z-[9999] justify-center"
          data-tip={formatFileName(data.cv.name)}
        >
          <button
            className="btn btn-ghost btn-sm p-1 border-base-300 w-28 inline-block"
            onClick={onCVFileClick}
          >
            <p className="truncate">{data.cv.name}</p>
          </button>
        </div>
      </td>
      <td>
        <div
          className={clsx("flex gap-2 items-center justify-center", [
            { tooltip: !!data.coverLetter },
          ])}
          data-tip={
            data.coverLetter?.name && formatFileName(data.coverLetter?.name)
          }
        >
          {data.coverLetter ? (
            <button
              className="btn btn-ghost btn-sm p-1 border-base-300 w-28 inline-block"
              onClick={onCLFileClick}
            >
              <p className="truncate">{data.coverLetter?.name}</p>
            </button>
          ) : (
            "-"
          )}
        </div>
      </td>
    </tr>
  );
}
