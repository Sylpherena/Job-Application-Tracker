import clsx from "clsx";
import React from "react";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  errorText?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (props: InputWithLabelProps, ref) => {
    const { className, errorText, label, type, ...rest } = props;

    return (
      <label className={clsx("form-control w-full max-w-xs", className)}>
        {label && (
          <div className="label font-semibold">
            <span className="label-text">{label}</span>
          </div>
        )}
        <input
          ref={ref}
          className={clsx("w-full max-w-xs", {
            ["input input-bordered input-primary input-sm "]: type !== "file",
            ["file-input file-input-bordered file-input-primary file-input-sm "]:
              type === "file",
          })}
          type={type}
          {...rest}
        />
        <div className="label p-1">
          <span
            className={clsx("label-text-alt text-error opacity-0", {
              ["opacity-100"]: !!errorText,
            })}
          >
            {errorText}
          </span>
        </div>
      </label>
    );
  }
);

export default InputWithLabel;
