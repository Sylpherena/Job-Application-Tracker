import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDataProvider } from "../../../../providers/data/DataContext";
import {
  ForgotEmailFormType,
  SignInFormType,
  SignUpFormType,
} from "./authenticationSchemas";

export const useSignUpMutation = (onSuccess: (email: string) => void) => {
  const queryClient = useQueryClient();
  const { signUp } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignUpFormType) => signUp(userData),
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      onSuccess(data);
    },
  });
};

export const useSignInMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { signIn } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignInFormType) => signIn(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
  });
};

export const useGoogleSignInMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { googleSignIn } = useDataProvider();

  return useMutation({
    mutationFn: () => googleSignIn(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
  });
};

export const usePasswordResetMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { passwordReset } = useDataProvider();

  return useMutation({
    mutationFn: (userForgotPassword: ForgotEmailFormType) =>
      passwordReset(userForgotPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
  });
};
