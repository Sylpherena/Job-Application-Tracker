import clsx from "clsx";
import { ToastProps } from "./toastTypes";
import { X } from "lucide-react";
import { useMemo } from "react";

interface ToastComponentProps {
  toast: ToastProps;
  onClose: (id: number) => void;
}

export default function Toast(props: ToastComponentProps) {
  const { toast, onClose } = props;
  const { id, message, type } = toast;

  const classNameByType = useMemo(() => {
    return "alert-" + type;
  }, [type]);

  return (
    <div className="toast relative opacity-80 hover:opacity-100 max-w-min p-2">
      <div className={clsx("alert", classNameByType)}>
        <span>{message}</span>
        <button
          className="bg-inherit p-1 rounded-btn hover:brightness-90"
          onClick={() => onClose(id)}
        >
          <X />
        </button>
      </div>
    </div>
  );
}
