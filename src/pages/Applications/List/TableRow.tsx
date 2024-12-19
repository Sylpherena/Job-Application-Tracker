import { Application } from "../../../localDB/types";
import FileButton from "./FileButton";

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
        <FileButton onClick={onCVFileClick} fileName={data.cv?.name} />
      </td>
      <td>
        <FileButton onClick={onCLFileClick} fileName={data.coverLetter?.name} />
      </td>
    </tr>
  );
}
