import React, { useRef } from "react";
import SelectWithLabel, { SelectWithLabelProps } from "./SelectWithLabel";
import { clsx } from "clsx";
import { Plus } from "lucide-react";

interface SelectWithUploadProps<TOption> extends SelectWithLabelProps<TOption> {
  className?: string;
  onUpload?: (file: File) => Promise<void>; //TODO: make async
  isUploading?: boolean;
}

const SelectWithUpload = <TOption,>(
  props: SelectWithUploadProps<TOption> & {
    ref?: React.Ref<HTMLSelectElement>;
  },
  ref: React.Ref<HTMLSelectElement>
) => {
  const { className, onUpload, isUploading = false, ...rest } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onUpload?.(files[0]);
    }
  };

  return (
    <div className={clsx("flex items-end w-60 sm:w-80", className)}>
      <SelectWithLabel
        ref={ref}
        placeholderName="file"
        className={clsx("form-control", className)}
        {...rest}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        aria-label="Add new file"
        type="button"
        className="btn btn-primary btn-sm mx-2 mb-9"
        onClick={handleButtonClick}
      >
        <span className="flex gap-1 items-center">
          <span className="hidden sm:flex">Add File</span>
          <Plus className="size-4" strokeWidth={3} />
          {isUploading && (
            <span
              aria-label="Uploading file, please wait"
              className="loading loading-spinner loading-sm"
            />
          )}
        </span>
      </button>
    </div>
  );
};

export default React.forwardRef(SelectWithUpload) as <TOption>(
  props: SelectWithUploadProps<TOption> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;
