import { useMutation } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";
import { useDataProvider } from "../../../../providers/data/DataContext";

export const useResendVerificationEmailMutation = (onSuccess: () => void) => {
  const { resendVerificationEmail } = useDataProvider();

  return useMutation({
    mutationFn: (user: FirebaseUser) => resendVerificationEmail(user),
    onSuccess,
  });
};
