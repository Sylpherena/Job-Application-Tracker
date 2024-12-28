import { ArrowDownToLine, File } from "lucide-react";
import Modal from "../../../components/Modal";
import { useFileData } from "./queries";
import clsx from "clsx";
import { formatFileName, formatFileSize } from "../../../../utils/utils";

export type FileType = "cl" | "cv";

export interface FileModalState {
  id?: string;
  type?: FileType;
  link?: string;
}

interface FileModalProps {
  modalState: FileModalState | null;
  onChange: () => void;
}

export default function FileModal(props: FileModalProps) {
  const { onChange, modalState } = props;

  const { isLoading, data: fileData } = useFileData(modalState);

  return (
    <Modal isOpen={!!modalState?.id} onModalStateChange={onChange}>
      <div className="flex min-h-40 h-fit mt-2 rounded-btn w-full items-center">
        <File className="size-36 text-primary" />
        <div className="flex flex-col gap-2 p-4 justify-between min-h-40 h-fit">
          <span className="flex items-start w-52">
            <p
              className={clsx(
                "label-text font-semibold text-lg text-base-content break-all",
                [{ "skeleton h-5 w-full": isLoading }]
              )}
            >
              {fileData?.name && formatFileName(fileData?.name)}
            </p>
          </span>
          <span className="flex flex-col gap-2">
            <p
              className={clsx("label-text text-base-content", [
                { "skeleton h-5": isLoading },
              ])}
            >
              {fileData?.lastModified &&
                new Date(fileData?.lastModified).toLocaleString()}
            </p>
            <p
              className={clsx("label-text text-base-content", [
                { "skeleton h-5": isLoading },
              ])}
            >
              {fileData?.size && formatFileSize(fileData?.size)}
            </p>
          </span>
        </div>
        <a
          aria-label="Download File"
          className={clsx("btn btn-primary rounded-full h-14 w-14", [
            { "btn-disabled": isLoading || !fileData?.link },
          ])}
          href={fileData?.link}
          download={fileData?.name}
        >
          <ArrowDownToLine />
        </a>
      </div>
    </Modal>
  );
}
