import { createContext, useContext } from "react";
import { ToastType } from "./toastTypes";

export type ToastContextType = (message: string, type?: ToastType) => void;

export const ToastContext = createContext<ToastContextType | null>(null);

export default function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
