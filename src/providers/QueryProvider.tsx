import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useToast from "./Toast/ToastContext";

const queryClient = new QueryClient();

export default function QueryProvider(props: React.PropsWithChildren) {
  const showToast = useToast();

  queryClient.getQueryCache().config.onError = (e) =>
    showToast(e.message, "error");
  queryClient.getMutationCache().config.onError = (e) =>
    showToast(e.message, "error");

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
