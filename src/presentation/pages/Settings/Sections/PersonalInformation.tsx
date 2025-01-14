import { useForm } from "react-hook-form";
import { useAuth } from "../../../../providers/auth/AuthContext";
import Input from "../../../components/Input";
import Section from "./Section";
import SectionActions from "./SectionActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNameSchema, UpdateNameType } from "./settingsSchemas";

export default function PersonalInformation() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateNameType>({
    mode: "onChange",
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: user!.name },
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

  const handleDiscard = () => {
    reset();
  };

  const isActionsDisabled = !isDirty || !!errors.name?.message;

  return (
    <Section title="Personal Information">
      <form onSubmit={handleSubmit(() => {})}>
        <Input
          label="Name"
          id="settings-name"
          placeholder="Name"
          defaultValue={user?.name}
          type="text"
          inputSize={"sm"}
          errorText={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="E-mail"
          id="settings-email"
          disabled
          value={user?.email}
          placeholder="Email"
          type="text"
          inputSize={"sm"}
        />
        <SectionActions
          saveDisabled={isActionsDisabled}
          discardDisabled={!isDirty}
          onDiscard={handleDiscard}
          onSubmit={() => {}}
          name="Personal Information"
        />
      </form>
    </Section>
  );
}
