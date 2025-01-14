import { useMutation } from "@tanstack/react-query";
import { useDataProvider } from "../../../providers/data/DataContext";

export const useLogOutMutation = (onSuccess: () => void) => {
  const { signOut } = useDataProvider();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess,
  });
};
