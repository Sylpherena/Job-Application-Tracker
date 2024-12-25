import { Mail, UserRound } from "lucide-react";
import LoginThirdParty from "./LoginThirdParty";
import PasswordInput from "../../../components/PasswordInput";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import {
  defaultSignUpFormValues,
  SignUpFormType,
  signUpSchema,
} from "./authenticationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = async () => {
    reset();
    console.log("submit");
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
          className="underline text-primary font-semibold cursor-pointer hover:text-secondary whitespace-nowrap w-min"
          href="/authentication/forgot-password"
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
          </button>
        </div>
      </div>
      <div className="divider font-semibold">OR</div>
      <LoginThirdParty />
    </div>
  );
}
