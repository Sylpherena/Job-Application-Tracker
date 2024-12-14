import clsx from "clsx";
import React from "react";

export interface SelectWithLabelProps<T>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  errorText?: string;
  placeHolder?: string;
  options?: T[]; // Options as a generic array
  getOptionLabel?: (option: T) => string; // Function to get label from option
  getOptionValue: (option: T) => string; // Function to get value from option
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
        className="select select-primary select-sm select-bordered"
        {...rest}
      >
        {placeHolder && (
          <option disabled value="">
            {placeHolder}
          </option>
        )}
        {options?.map((o) => (
          <option key={getOptionValue(o)} value={getOptionValue(o)}>
            {getOptionLabel(o)}
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
