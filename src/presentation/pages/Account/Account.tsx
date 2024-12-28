import { Mail, UserRound, UserRoundCog } from "lucide-react";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

export default function Account() {
  return (
    <div className="flex flex-1 h-full min-h-screen bg-secondary/30 overflow-auto p-4 sm:p-8 justify-center">
      <div className="card border border-primary bg-base-100 p-4 lg:p-8 shadow-md w-full lg:mx-16 h-full gap-4 max-w-5xl">
        <h2 className="text-base-content text-3xl font-semibold">
          Account Settings
        </h2>
        <div className="flex gap-4">
          <div className="p-4 bg-base-200 text-base-content w-32 h-32 rounded-full items-center flex justify-center">
            <UserRoundCog className="aspect-square" />
          </div>
          <div className="card border-primary border overflow-hidden grow">
            <div className="relative top-0 bg-primary/30 rounded-b-none p-1 sm:p-2">
              <h3 className="text-base-content text-xl font-semibold">
                Basic Information
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-2 sm:p-4">
              <Input
                id="settings-name"
                Icon={UserRound}
                placeholder="Name"
                type="text"
                inputSize={"sm"}
                // errorText={errors.name?.message}
                // {...register("name")}
              />
              <Input
                id="settings-email"
                Icon={Mail}
                placeholder="Email"
                type="text"
                inputSize={"sm"}
                // errorText={errors.email?.message}
                // {...register("email")}
              />
              <PasswordInput
                id="settings-password"
                inputSize={"sm"}
                // errorText={errors.password?.message}
                // {...register("password")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
