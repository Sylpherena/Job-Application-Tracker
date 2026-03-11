import { ArrowRight, X } from "lucide-react";
import Input from "../../../components/Input";
import clsx from "clsx";

export default function FilterForm() {
  return (
    <div className={clsx("w-full text-bold bg-base-100")}>
      <div className="flex justify-between text-lg text-base-content p-1 px-6 w-full">
        <h3 className="text-lg font-bold">Filters</h3>
        <button type="button" className="btn btn-xs text-error btn-ghost">
          <X className="h-4 w-4" />
          Clear Filters
        </button>
      </div>
      <div className="divider m-0" />
      <div className="flex flex-col gap-3 px-2 pb-3 label-text font-semibold text-base-content">
        <div className="flex gap-1 items-end max-w-fit overflow-hidden p-1">
          <Input
            id="filter-table-date-min"
            className="w-32 sm:w-full"
            label="From:"
            type="date"
            inputSize="sm"
            hideErrorText
            centerLabel
            aria-label="From date"
          />
          <label className="h-7 flex items-center">
            <ArrowRight className="h-4 w-4" />
          </label>
          <Input
            id="filter-table-date-max"
            label="To:"
            className="w-32 sm:w-full"
            type="date"
            inputSize="sm"
            hideErrorText
            centerLabel
            aria-label="To date"
          />
        </div>
        <label
          className="flex gap-2 items-center"
          htmlFor="filter-table-company-input"
        >
          Company:
          <Input
            id="filter-table-company"
            placeholder="e.g. Acme Company"
            inputSize="sm"
            hideErrorText
          />
        </label>
        <label
          className="flex gap-2 items-center"
          htmlFor="filter-table-position-input"
        >
          Position:
          <Input
            id="filter-table-position"
            placeholder="e.g. Sofware Engineer"
            inputSize="sm"
            hideErrorText
          />
        </label>
        <label
          className="flex gap-2 items-center"
          htmlFor="filter-table-country-input"
        >
          Country:
          <Input
            id="filter-table-country"
            placeholder="e.g. UK"
            autoComplete="country-name"
            inputSize="sm"
            hideErrorText
          />
        </label>
        <label
          className="flex gap-2 items-center"
          htmlFor="filter-table-location-input"
        >
          Location:
          <Input
            id="filter-table-location"
            placeholder="e.g. Manchester"
            inputSize="sm"
            hideErrorText
          />
        </label>
      </div>
      <div className="flex w-full justify-center py-2">
        <button
          type="submit"
          className="btn btn-sm btn-primary w-32 menu-dropdown-toggle"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
