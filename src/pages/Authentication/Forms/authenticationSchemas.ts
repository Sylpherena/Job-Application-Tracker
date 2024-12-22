import { z } from "zod";

export interface ForgotEmailFormType {
  email: string;
}

export const defaultForgotEmailFormValues = {
  email: "",
};

export interface SignInFormType extends ForgotEmailFormType {
  password: string;
}

export const defaultSignInFormValues = {
  password: "",
  ...defaultForgotEmailFormValues,
};

export interface SignUpFormType extends SignInFormType {
  name: string;
}

export const defaultSignUpFormValues = {
  name: "",
  ...defaultSignInFormValues,
};

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const signInSchema = emailSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1, "Name is required"),
});
