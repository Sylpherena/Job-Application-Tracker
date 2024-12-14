import React, { useRef, useState } from "react";
import SelectWithLabel, { SelectWithLabelProps } from "./SelectWithLabel";
import { clsx } from "clsx";
import { delay } from "../utils/utils";
import useToast from "./Layout/Toast/ToastContext";
import { Plus } from "lucide-react";

interface SelectWithUploadProps<T> extends SelectWithLabelProps<T> {
  className?: string;
  onUpload?: (file: File) => void; //TODO: make async
}

const SelectWithUpload = <T,>(
  props: SelectWithUploadProps<T> & { ref?: React.Ref<HTMLSelectElement> },
  ref: React.Ref<HTMLSelectElement>
) => {
  const { className, getOptionValue, onUpload, ...rest } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUploadReturn, setFileUploadReturn] = useState<string>();
  const [isUploading, setUploading] = useState<boolean>(false);
  const showToast = useToast();

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const isError = Math.random() < 0.5;
      if (isError) {
        showToast("File " + files[0].name + " exceeds limit", "error");
        setFileUploadReturn("Could't Upload ✗");
      } else {
        setUploading(true);
        await delay(500);
        onUpload?.(files[0]);
        setUploading(false);
        setFileUploadReturn("File Uploaded ✓");
      }
    }
  };

  return (
    <div className={clsx("flex items-end", className)}>
      <SelectWithLabel
        ref={ref}
        getOptionValue={getOptionValue}
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
          className="btn btn-primary btn-sm mx-2"
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
        <div className="label mx-2">
          <span
            className={clsx(
              "label-text-alt text-error opacity-0 h-4 font-bold",
              {
                ["opacity-100"]: !!fileUploadReturn,
                ["text-success"]: fileUploadReturn === "File Uploaded ✓",
              }
            )}
          >
            {fileUploadReturn}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(SelectWithUpload) as <T>(
  props: SelectWithUploadProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;
