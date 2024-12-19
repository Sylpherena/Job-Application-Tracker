import { ArrowDownToLine, File } from "lucide-react";
import Modal from "../../../components/Modal";
import { useFileData } from "./queries";
import clsx from "clsx";
import { formatFileName, formatFileSize } from "../../../utils/utils";

export type FileType = "cl" | "cv";

export interface FileModalType {
  id?: string;
  type?: FileType;
  link?: string;
}

interface FileModalCompProps {
  modalState: FileModalType | null;
  onChange: () => void;
}

export default function FileModal(props: FileModalCompProps) {
  const { onChange, modalState } = props;

  const { isLoading, data: file } = useFileData(modalState);

  return (
    <Modal isOpen={!!modalState?.id} onModalStateChange={onChange}>
      <div className="flex min-h-40 h-fit mt-2 rounded-btn w-full items-center">
        <File className="size-36 text-primary" />
        <div className="flex flex-col gap-2 p-4 justify-between min-h-40 h-fit">
          <span className="flex items-start w-52">
            <p
              className={clsx(
                "label-text font-semibold text-lg text-primary-content break-all",
                [{ "skeleton h-5 w-full": isLoading }]
              )}
            >
              {file?.name && formatFileName(file?.name)}
            </p>
          </span>
          <span className="flex flex-col gap-2">
            <p
              className={clsx("label-text text-primary-content", [
                { "skeleton h-5": isLoading },
              ])}
            >
              {file?.lastModified &&
                new Date(file?.lastModified).toLocaleString()}
            </p>
            <p
              className={clsx("label-text text-primary-content", [
                { "skeleton h-5": isLoading },
              ])}
            >
              {file?.size && formatFileSize(file?.size)}
            </p>
          </span>
        </div>
        <a
          className={clsx("btn btn-primary rounded-full h-14 w-14", [
            { "btn-disabled": isLoading || !file?.link },
          ])}
          href={file?.link}
          download={file?.name}
        >
          <ArrowDownToLine />
        </a>
      </div>
    </Modal>
  );
}
