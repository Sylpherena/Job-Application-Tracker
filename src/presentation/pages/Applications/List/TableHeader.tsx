import { useEffect, useRef } from "react";
import { SelectAllState } from "./useSelect";
import {
  ApplicationSortableField,
  SortDirection,
} from "../../../../domain/models/application";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TableHeaderProps {
  onSelectAll: () => void;
  selectAllState: SelectAllState;
  onSort: (sortBy: ApplicationSortableField) => void;
  sortData?: { sortBy: ApplicationSortableField; directionStr: SortDirection };
}

export default function TableHeader(props: TableHeaderProps) {
  const { onSelectAll, selectAllState, onSort, sortData } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selectAllState === "indeterminate";
    }
  }, [selectAllState]);

  const getArrowForField = (field: ApplicationSortableField) => {
    if (sortData?.sortBy !== field) {
      return null;
    }
    return sortData.directionStr === "asc" ? <ArrowUp /> : <ArrowDown />;
  };

  return (
    <thead className="bg-primary bg-opacity-50 text-base-content/80">
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
        <th onClick={() => onSort("applicationDate")}>
          <div className="flex justify-start items-center gap-1 cursor-pointer">
            App. Date {getArrowForField("applicationDate")}
          </div>
        </th>
        <th onClick={() => onSort("company")}>
          <div className="flex justify-start items-center gap-1 cursor-pointer">
            Company {getArrowForField("company")}
          </div>
        </th>
        <th onClick={() => onSort("position")}>
          <div className="flex justify-start items-center gap-1 cursor-pointer">
            Position {getArrowForField("position")}
          </div>
        </th>
        <th onClick={() => onSort("country")}>
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            Country {getArrowForField("country")}
          </div>
        </th>
        <th onClick={() => onSort("location")}>
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            Location {getArrowForField("location")}
          </div>
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
