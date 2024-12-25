import { ChevronLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultForgotEmailFormValues,
  ForgotEmailFormType,
  forgotPasswordSchema,
} from "./authenticationSchemas";

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

  const onSubmit = async () => {
    reset();
    console.log("submit");
    navigate("/authentication/sign-in");
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
