import React, { useRef } from "react";
import SelectWithLabel, { SelectWithLabelProps } from "./SelectWithLabel";
import { clsx } from "clsx";
import { Plus } from "lucide-react";

interface SelectWithUploadProps<T> extends SelectWithLabelProps<T> {
  className?: string;
  onUpload?: (file: File) => Promise<void>; //TODO: make async
  isUploading?: boolean;
}

const SelectWithUpload = <T,>(
  props: SelectWithUploadProps<T> & { ref?: React.Ref<HTMLSelectElement> },
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
    <div className={clsx("flex items-end", className)}>
      <SelectWithLabel
        ref={ref}
        placeHolder="No file selected"
        className={clsx("form-control w-full max-w-xs", className)}
        {...rest}
      />
      <div className="flex flex-col">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm mx-2 mb-8"
          onClick={handleButtonClick}
        >
          <span className="flex gap-1 items-center">
            Add File
            <Plus className="size-4" strokeWidth={3} />
            {isUploading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default React.forwardRef(SelectWithUpload) as <T>(
  props: SelectWithUploadProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;
