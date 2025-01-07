import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/PasswordInput";
import Section from "./Section";
import SectionActions from "./SectionActions";
import {
  defaultPasswordWithConfirmation,
  passwordWithConfirmationSchema,
  PasswordWithConfirmationType,
} from "./settingsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordWithConfirmationType>({
    mode: "onChange",
    resolver: zodResolver(passwordWithConfirmationSchema),
    defaultValues: defaultPasswordWithConfirmation,
  });

  //   const handleSignInSuccess = () => {
  //     navigate("/");
  //     reset();
  //   };

  //   const { mutate: mutateUpdateName, isPending: isNameUpdatePending } =
  //     useSignInMutation(handleSignInSuccess);

  //   const onSubmit = async (data: FieldValues) => {
  //     mutateUpdateName(data);
  //   };

  const onDiscard = () => {
    reset();
  };

  const isActionsDisabled =
    !isDirty || !!errors.password?.message || !!errors.confirmPassword?.message;

  return (
    <Section title="Change Password">
      <form onSubmit={handleSubmit(() => {})}>
        <PasswordInput
          hideIcon
          label="New Password"
          id="settings-password"
          inputSize={"sm"}
          errorText={isDirty ? errors.password?.message : ""}
          {...register("password")}
        />
        <PasswordInput
          hideIcon
          label="Confirm Password"
          id="settings-confirm-password"
          inputSize={"sm"}
          errorText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <SectionActions
          onDiscard={onDiscard}
          onSubmit={() => {}}
          saveDisabled={isActionsDisabled}
          discardDisabled={!isDirty}
          name="Change password"
        />
      </form>
    </Section>
  );
}
