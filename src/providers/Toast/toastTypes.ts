export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
}
