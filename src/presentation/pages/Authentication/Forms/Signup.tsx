import { Mail, UserRound } from "lucide-react";
import LoginThirdParty from "./LoginThirdParty";
import { FieldValues, useForm } from "react-hook-form";
import {
  defaultSignUpFormValues,
  SignUpFormType,
  signUpSchema,
} from "./authenticationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import useToast from "../../../../providers/Toast/ToastContext";
import { useSignUpMutation } from "./queries";
import { UserCreate } from "../../../../domain/models";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: defaultSignUpFormValues,
  });

  const showToast = useToast();
  const navigate = useNavigate();

  const handleSignUpSuccess = (email: string) => {
    navigate("/authentication/sign-in");
    reset();
    showToast("Verification email sent to: " + email, "success");
  };

  const { mutate: mutateSignUp, isPending: isSignUpPending } =
    useSignUpMutation(handleSignUpSuccess);

  const onSubmit = async (data: FieldValues) => {
    mutateSignUp(data as UserCreate);
  };

  return (
    <div
      id="sign-up-panel"
      aria-labelledby="sign-up-tab"
      role="tabpanel"
      className="tab-content bg-base-100 rounded-box p-6"
    >
      <div className="flex flex-col gap-4">
        <Input
          id="sign-up-name"
          Icon={UserRound}
          placeholder="Name"
          type="text"
          errorText={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="sign-up-email"
          Icon={Mail}
          placeholder="Email"
          type="text"
          errorText={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          id="sign-up-password"
          errorText={errors.password?.message}
          {...register("password")}
        />
        <a
          className={clsx(
            "underline text-primary font-semibold cursor-pointer hover:text-secondary whitespace-nowrap w-min",
            [
              {
                "cursor-not-allowed text-base-content hover:text-base-content":
                  isSignUpPending,
              },
            ]
          )}
          href={
            !isSignUpPending ? "/authentication/forgot-password" : undefined
          }
        >
          Forgot Password?
        </a>
        <div className="flex w-full justify-center">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
            {isSignUpPending && (
              <span
                aria-label="Sign up pending, please wait"
                className="loading loading-spinner loading-sm"
              />
            )}
          </button>
        </div>
      </div>
      <div className="divider font-semibold">OR</div>
      <LoginThirdParty />
    </div>
  );
}
