import { z } from "zod";

export interface ForgotEmailFormType {
  email: string;
}

export const defaultForgotEmailFormValues = {
  email: "",
};

export interface SignInFormType {
  email: string;
  password: string;
}

export const defaultSignInFormValues = {
  email: "",
  password: "",
};

export interface SignUpFormType {
  name: string;
  email: string;
  password: string;
}

export const defaultSignUpFormValues = {
  name: "",
  email: "",
  password: "",
};

const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

export const nameSchema = z.string().min(1, "Name is required");

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
