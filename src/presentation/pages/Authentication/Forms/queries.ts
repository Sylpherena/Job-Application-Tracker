import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDataProvider } from "../../../../providers/data/DataContext";
import {
  ForgotEmailFormType,
  SignInFormType,
  SignUpFormType,
} from "./authenticationSchemas";
import { User } from "../../../../domain/models";

export const useSignUpMutation = (onSuccess: (email: string) => void) => {
  const queryClient = useQueryClient();
  const { signUp } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignUpFormType) => signUp(userData),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      onSuccess(data.email);
    },
  });
};

export const useSignInMutation = (onSuccess: (name: string) => void) => {
  const queryClient = useQueryClient();
  const { signIn } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignInFormType) => signIn(userData),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data.name);
    },
  });
};

export const useGoogleSignInMutation = (onSuccess: (name: string) => void) => {
  const queryClient = useQueryClient();
  const { googleSignIn } = useDataProvider();

  return useMutation({
    mutationFn: () => googleSignIn(),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data.name);
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
