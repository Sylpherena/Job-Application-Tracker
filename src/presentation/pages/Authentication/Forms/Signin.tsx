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
import { useSignInMutation } from "./queries";
import { UserSignIn } from "../../../../domain/models";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate("/");
    reset();
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Link
          className={clsx(
            "underline text-primary font-semibold cursor-pointer hover:text-secondary whitespace-nowrap w-min",
            [
              {
                "cursor-not-allowed text-base-content hover:text-base-content":
                  isSignInPending,
              },
            ]
          )}
          to={!isSignInPending ? "/authentication/forgot-password" : "#"}
        >
          Forgot Password?
        </Link>
        <div className="flex w-full justify-center">
          <button className="btn btn-primary" type="submit">
            Sign in
            {isSignInPending && (
              <span
                aria-label="Signing in, please wait"
                className="loading loading-spinner loading-sm"
              />
            )}
          </button>
        </div>
      </form>
      <div className="divider font-semibold">OR</div>
      <LoginThirdParty />
    </div>
  );
}
