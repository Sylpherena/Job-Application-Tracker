import Input from "../../../components/Input";

export default function FilterRow() {
  return (
    <div className="flex-1 h-full bg-secondary p-1">
      <div className="flex justify-around">
        <label className="flex gap-2 items-center text-secondary-content">
          Filter by date:
          <Input
            id="filter-table-date-min"
            type="date"
            inputSize="sm"
            hideErrorText
          />
          {" - "}
          <Input
            id="filter-table-date-max"
            type="date"
            inputSize="sm"
            hideErrorText
          />
        </label>
        <label className="flex gap-2 items-center text-secondary-content">
          Search:
          <Input
            id="search-table"
            placeholder="Search"
            inputSize="sm"
            hideErrorText
          />
        </label>
      </div>
    </div>
  );
}
