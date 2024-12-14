import React, { useState, useCallback } from "react";
import Toast from "./Toast";
import { ToastProps } from "./toastTypes";
import { ToastContext } from "./ToastContext";

export default function ToastProvider(props: React.PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastProps["type"] = "info") => {
      const id = Date.now();
      if (toasts.length > 1) {
        removeToast(toasts[0].id);
      }
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000); // Auto-remove after 3 seconds
    },
    [removeToast, toasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {props.children}
      <div className="flex flex-col items-end justify-end z-[9999] overflow-y-scroll max-h-min bottom-0 fixed right-0 p-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
