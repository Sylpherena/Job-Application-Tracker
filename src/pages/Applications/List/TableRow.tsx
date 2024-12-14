import { ArrowDownToLine } from "lucide-react";

export default function TableRow() {
  return (
    <tr className="h-20 hover:bg-primary hover:bg-opacity-5">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>2020-11-14</td>
      <td>
        <div className="font-bold">Hart Hagerty</div>
      </td>
      <td>Software Engineer</td>
      <td>England</td>
      <td>Manchester</td>
      <th>
        <div className="flex gap-2 items-center">
          <p className="font-normal">CV_02.pdf</p>
          <button className="btn btn-ghost btn-sm p-1">
            <ArrowDownToLine />
          </button>
        </div>
      </th>
      <th>
        <div className="flex gap-2 items-center">
          <p className="font-normal">CoverLetter_4.pdf</p>
          <button className="btn btn-ghost btn-sm p-1">
            <ArrowDownToLine />
          </button>
        </div>
      </th>
    </tr>
  );
}
