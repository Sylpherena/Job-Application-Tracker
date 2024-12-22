import { Mail } from "lucide-react";
import LoginThirdParty from "./LoginThirdParty";
import PasswordInput from "../../../components/PasswordInput";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import {
  defaultSignInFormValues,
  SignInFormType,
  signInSchema,
} from "./authenticationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signin() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInFormValues,
  });

  const onSubmit = async () => {
    console.log("submit");
  };

  return (
    <div role="tabpanel" className="tab-content bg-base-100 rounded-box p-6">
      <div className="flex flex-col gap-4">
        <Input
          Icon={Mail}
          placeholder="Email"
          type="text"
          errorText={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          errorText={errors.password?.message}
          {...register("password")}
        />
        <a
          className="underline text-primary font-semibold cursor-pointer hover:text-secondary whitespace-nowrap"
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
            Sign in
          </button>
        </div>
      </div>
      <div className="divider font-semibold">OR</div>
      <LoginThirdParty />
    </div>
  );
}
