import clsx from "clsx";
import React from "react";

export interface SelectWithLabelProps<T>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  errorText?: string;
  isOptionsLoading?: boolean;
  emptyMessage?: string;
  placeHolder?: string;
  options?: T[]; // Options as a generic array
  getOptionLabel?: (option: T) => string | undefined; // Function to get label from option
  getOptionValue?: (option: T) => number | string | undefined; // Function to get value from option
}

const SelectWithLabel = <T,>(
  props: SelectWithLabelProps<T> & { ref?: React.Ref<HTMLSelectElement> },
  ref: React.Ref<HTMLSelectElement>
) => {
  const {
    className,
    errorText,
    label,
    placeHolder,
    emptyMessage = "No data found",
    isOptionsLoading = false,
    options = [],
    getOptionValue,
    getOptionLabel = getOptionValue,
    ...rest
  } = props;

  return (
    <label className={clsx("form-control w-full max-w-xs", className)}>
      {label && (
        <div className="label font-semibold">
          <span className="label-text">{label}</span>
        </div>
      )}
      <select
        ref={ref}
        defaultValue={""}
        className="select select-primary select-sm select-bordered"
        {...rest}
      >
        {placeHolder && <option value={""}>{placeHolder}</option>}
        {isOptionsLoading && (
          <option disabled value={"loading-info"}>
            Loading...
          </option>
        )}
        {options.length === 0 && !isOptionsLoading && (
          <option disabled value={"no-option-found"}>
            {emptyMessage}
          </option>
        )}
        {options?.map((o) => (
          <option key={getOptionValue?.(o)} value={getOptionValue?.(o)}>
            {getOptionLabel?.(o)}
          </option>
        ))}
      </select>
      <div className="label">
        <span
          className={clsx("label-text-alt text-error opacity-0 h-4", {
            ["opacity-100"]: !!errorText,
          })}
        >
          {errorText}
        </span>
      </div>
    </label>
  );
};

export default React.forwardRef(SelectWithLabel) as <T>(
  props: SelectWithLabelProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;
