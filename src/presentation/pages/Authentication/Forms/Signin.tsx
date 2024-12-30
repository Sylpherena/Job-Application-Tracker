import { Mail } from "lucide-react";
import LoginThirdParty from "./LoginThirdParty";
import PasswordInput from "../../../components/PasswordInput";
import Input from "../../../components/Input";
import { FieldValues, useForm } from "react-hook-form";
import {
  defaultSignInFormValues,
  SignInFormType,
  signInSchema,
} from "./authenticationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useToast from "../../../../providers/Toast/ToastContext";
import { useSignInMutation } from "./queries";
import { UserSignIn } from "../../../../domain/models";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInFormValues,
  });

  const showToast = useToast();
  const navigate = useNavigate();

  const handleSignInSuccess = (name: string) => {
    navigate("/");
    reset();
    showToast("Welcome " + name, "success");
  };

  const { mutate: mutateSignIn, isPending: isSignInPending } =
    useSignInMutation(handleSignInSuccess);

  const onSubmit = async (data: FieldValues) => {
    mutateSignIn(data as UserSignIn);
  };

  return (
    <div
      id="sign-in-panel"
      aria-labelledby="sign-in-tab"
      role="tabpanel"
      className="tab-content bg-base-100 rounded-box p-6"
    >
      <div className="flex flex-col gap-4">
        <Input
          id="sign-in-email"
          Icon={Mail}
          placeholder="Email"
          type="text"
          errorText={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          id="sign-in-password"
          errorText={errors.password?.message}
          {...register("password")}
        />
        <a
          className={clsx(
            "underline text-primary font-semibold cursor-pointer hover:text-secondary whitespace-nowrap w-min",
            [
              {
                "cursor-not-allowed text-base-content hover:text-base-content":
                  isSignInPending,
              },
            ]
          )}
          href={
            !isSignInPending ? "/authentication/forgot-password" : undefined
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
            Sign in
            {isSignInPending && (
              <span
                aria-label="Signing in, please wait"
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
