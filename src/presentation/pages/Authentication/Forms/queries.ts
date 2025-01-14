import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDataProvider } from "../../../../providers/data/DataContext";
import {
  ForgotEmailFormType,
  SignInFormType,
  SignUpFormType,
} from "./authenticationSchemas";
import { User as FirebaseUser } from "firebase/auth";

export const useSignUpMutation = (onSuccess: (email: string) => void) => {
  const { signUp } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignUpFormType) => signUp(userData),
    onSuccess: (data: string) => {
      onSuccess(data);
    },
  });
};

export const useSignInMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { signIn } = useDataProvider();

  return useMutation({
    mutationFn: (userData: SignInFormType) => signIn(userData),
    onSuccess: (data: FirebaseUser) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (data.emailVerified === true) {
        onSuccess();
      }
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
  const { passwordReset } = useDataProvider();

  return useMutation({
    mutationFn: (userForgotPassword: ForgotEmailFormType) =>
      passwordReset(userForgotPassword),
    onSuccess: () => {
      onSuccess();
    },
  });
};
