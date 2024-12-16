import { FieldValues, useForm } from "react-hook-form";
import InputWithLabel from "../../../components/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultFormValues, formSchema, FormType } from "./formSchema";
import SelectWithUpload from "../../../components/SelectWithUpload";
import { fileToFileRecord } from "../../../utils/utils";
import { Application } from "../../../localDB/types";
import {
  useAddApplicationMutation,
  useAddCLMutation,
  useAddCVMutation,
  useCLs,
  useCVs,
} from "./queries";
import useToast from "../../../providers/Toast/ToastContext";

export default function Form(props: { onSubmit: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const showToast = useToast();

  const handleUploadSuccess = () => {
    showToast("File Uploaded", "success");
  };

  const handleAddApplicationSuccess = () => {
    props.onSubmit(); // To close modal
    reset();
    showToast("Application Added", "success");
  };

  const { mutate: mutateApplications, isPending: isApplicationsPending } =
    useAddApplicationMutation(handleAddApplicationSuccess);

  const { mutate: mutateCVs, isPending: isCVsPending } =
    useAddCVMutation(handleUploadSuccess);

  const { mutate: mutateCLs, isPending: isCLsPending } =
    useAddCLMutation(handleUploadSuccess);

  const { data: cvs, isLoading: isCvsLoading } = useCVs();
  const { data: cls, isLoading: isCLsLoading } = useCLs();

  const onSubmit = async (data: FieldValues) => {
    mutateApplications(data as Application);
  };

  const onCVUpload = async (file: File) => {
    const fileToAdd = await fileToFileRecord(file);

    mutateCVs(fileToAdd);
  };

  const onCLUpload = async (file: File) => {
    const fileToAdd = await fileToFileRecord(file);

    mutateCLs(fileToAdd);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control p-2">
        <InputWithLabel
          label="Application Date"
          type="date"
          errorText={errors.applicationDate?.message}
          {...register("applicationDate")}
        />
      </div>
      <div className="flex w-full gap-4">
        <InputWithLabel
          label="Position"
          placeholder="Enter position"
          errorText={errors.position?.message}
          {...register("position")}
        />
        <InputWithLabel
          label="Company"
          placeholder="Enter Company"
          errorText={errors.company?.message}
          {...register("company")}
        />
      </div>
      <div className="flex w-full gap-4">
        <InputWithLabel
          label="Country"
          placeholder="Enter position"
          errorText={errors.country?.message}
          {...register("country")}
        />
        <InputWithLabel
          label="Location"
          placeholder="Enter position"
          errorText={errors.location?.message}
          {...register("location")}
        />
      </div>
      <SelectWithUpload
        isUploading={isCVsPending}
        isOptionsLoading={isCvsLoading}
        label="CV"
        errorText={errors.cvId?.message}
        options={cvs}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCVUpload}
        {...register("cvId")}
      />
      <SelectWithUpload
        isUploading={isCLsPending}
        isOptionsLoading={isCLsLoading}
        label="Cover Letter"
        errorText={errors.coverLetterId?.message}
        options={cls}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCLUpload}
        {...register("coverLetterId")}
      />
      <div className="w-full flex justify-center p-2">
        <button type="submit" className="btn btn-primary">
          <span className="flex gap-1 items-center">
            Submit
            {isApplicationsPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
