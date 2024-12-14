import { useState, useEffect } from "react";
import useToast from "../components/Layout/Toast/ToastContext";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fetchFunction();
        setState({ data, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          showToast((err as Error).message, "error");
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }
    };

    fetchData();
  }, [fetchFunction]); // Re-run if the `url` changes

  return state; // Return data, loading, and error
};
