import { ArrowDownToLine } from "lucide-react";
import { Application } from "../../../localDB/types";

type Props = {
  data: Application;
};

export default function TableRow(props: Props) {
  const { data } = props;

  return (
    <tr className="h-20 hover:bg-primary hover:bg-opacity-5">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{data.applicationDate}</td>
      <td>
        <div className="font-bold">{data.company}</div>
      </td>
      <td>{data.position}</td>
      <td>{data.country}</td>
      <td>{data.location}</td>
      <th>
        <div className="flex gap-2 items-center">
          <p className="font-normal">{data.cvId}</p>
          <button className="btn btn-ghost btn-sm p-1">
            <ArrowDownToLine />
          </button>
        </div>
      </th>
      <th>
        <div className="flex gap-2 items-center">
          <p className="font-normal">{data.coverLetterId}</p>
          <button className="btn btn-ghost btn-sm p-1">
            <ArrowDownToLine />
          </button>
        </div>
      </th>
    </tr>
  );
}
