import clsx from "clsx";
import { formatFileName } from "../../../../utils/utils";

interface FileButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fileName: string | undefined;
}

export default function FileButton(props: FileButtonProps) {
  const { onClick, fileName } = props;

  return (
    <div
      className={clsx("flex gap-2 items-center justify-center", [
        { tooltip: !!fileName },
      ])}
      data-tip={fileName && formatFileName(fileName)}
    >
      {fileName ? (
        <button
          className="btn btn-ghost btn-sm p-1 border-base-300 w-28 inline-block"
          onClick={onClick}
        >
          <p className="truncate">{fileName}</p>
        </button>
      ) : (
        "-"
      )}
    </div>
  );
}
