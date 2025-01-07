import { z } from "zod";
import {
  nameSchema,
  passwordSchema,
} from "../../Authentication/Forms/authenticationSchemas";

export interface PasswordWithConfirmationType {
  password: string;
  confirmPassword: string;
}

export const passwordWithConfirmationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This specifies that the error message will be associated with the confirmPassword field
  });

export const defaultPasswordWithConfirmation: PasswordWithConfirmationType = {
  password: "",
  confirmPassword: "",
};

export interface UpdateNameType {
  name: string;
}

export const updateNameSchema = z.object({
  name: nameSchema,
});
