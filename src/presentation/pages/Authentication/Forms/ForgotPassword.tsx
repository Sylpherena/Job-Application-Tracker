import { ChevronLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultForgotEmailFormValues,
  ForgotEmailFormType,
  forgotPasswordSchema,
} from "./authenticationSchemas";
import useToast from "../../../../providers/Toast/ToastContext";
import { usePasswordResetMutation } from "./queries";
import { UserForgotPassword } from "../../../../domain/models";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotEmailFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: defaultForgotEmailFormValues,
  });

  const showToast = useToast();

  const handlePasswordResetSuccess = () => {
    navigate("/authentication/sign-in");
    reset();
    showToast("Password reset email sent. Please check your inbox.", "success");
  };

  const { mutate: mutatePasswordReset, isPending: isPasswordResetPending } =
    usePasswordResetMutation(handlePasswordResetSuccess);

  const onSubmit = async (data: FieldValues) => {
    mutatePasswordReset(data as UserForgotPassword);
  };

  return (
    <div className="card border border-primary bg-base-100 p-4 lg:p-10 shadow-md max-w-lg w-fit lg:mx-16 lg:w-full h-fit z-[1]">
      <div className="bg-base-100 rounded-box p-6">
        <button
          aria-label="Go to sign in page"
          className="btn btn-sm btn-circle absolute left-2 top-2"
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        >
          <ChevronLeft />
        </button>
        <div className="flex flex-col gap-4">
          <h3 className="text-center text-3xl font-bold text-base-content">
            Forgot Password?
          </h3>
          <p className="text-center label">
            Enter your registered e-mail and password reset link will be sent to
            that e-mail.
          </p>
          <Input
            id="forgot-password-email"
            Icon={Mail}
            placeholder="Email"
            type="text"
            errorText={errors.email?.message}
            {...register("email")}
          />
          <div className="flex w-full justify-center">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Reset Password
              {isPasswordResetPending && (
                <span
                  aria-label="Creating request for reset password link, please wait"
                  className="loading loading-spinner loading-sm"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
