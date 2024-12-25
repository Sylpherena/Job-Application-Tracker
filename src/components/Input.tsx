import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  errorText?: string;
  Icon?: LucideIcon;
  inputSize?: "sm" | "md";
  endSlot?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      id,
      className,
      errorText,
      label,
      type,
      inputClassName,
      Icon,
      inputSize = "md",
      endSlot,
      placeholder,
      ...rest
    } = props;

    const ariaName = label ?? placeholder;

    return (
      <label className={clsx("form-control grow", className)}>
        {label && (
          <div className="label font-semibold">
            <span className="label-text">{label}</span>
          </div>
        )}
        <label
          className={clsx("grow flex items-center gap-2", {
            ["input input-bordered input-primary input-" + inputSize]:
              type !== "file",
            ["file-input file-input-bordered file-input-primary file-input-" +
            inputSize]: type === "file",
            inputClassName,
          })}
        >
          {Icon && (
            <Icon
              fill=""
              className="opacity-30 text-base-300 fill-base-content"
            />
          )}
          <input
            aria-label={"Enter " + ariaName}
            aria-invalid={!!errorText}
            aria-errormessage={id + "-error"}
            ref={ref}
            id={id + "-input"}
            type={type}
            className="grow"
            placeholder={placeholder}
            {...rest}
          />
          {endSlot && endSlot}
        </label>
        <div className="label p-1">
          <span
            className={clsx("label-text-alt text-error opacity-0", {
              ["opacity-100"]: !!errorText,
            })}
            id={id + "-error"}
          >
            {errorText}
          </span>
        </div>
      </label>
    );
  }
);

export default Input;
