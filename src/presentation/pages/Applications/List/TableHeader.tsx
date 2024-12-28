import { useEffect, useRef } from "react";
import { SelectAllState } from "./useSelect";

interface TableHeaderProps {
  onSelectAll: () => void;
  selectAllState: SelectAllState;
}

export default function TableHeader(props: TableHeaderProps) {
  const { onSelectAll, selectAllState } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selectAllState === "indeterminate";
    }
  }, [selectAllState]);

  return (
    <thead className="bg-primary bg-opacity-20 text-base-content/80">
      <tr>
        <th>
          <label>
            <input
              ref={checkboxRef}
              aria-label="Select all applications on this page"
              type="checkbox"
              className="checkbox"
              checked={selectAllState === "checked"}
              onChange={onSelectAll}
            />
          </label>
        </th>
        <th>App. Date</th>
        <th>Company</th>
        <th>Position</th>
        <th>
          <div className="flex justify-center items-center">Country</div>
        </th>
        <th>
          <div className="flex justify-center items-center">Location</div>
        </th>
        <th>
          <div className="flex justify-center items-center">CV</div>
        </th>
        <th>
          <div className="flex justify-center items-center">Cover Letter</div>
        </th>
      </tr>
    </thead>
  );
}
