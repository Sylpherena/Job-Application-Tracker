import { FieldValues, useForm } from "react-hook-form";
import InputWithLabel from "../../../components/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultFormValues,
  dummyFiles,
  formSchema,
  FormType,
} from "./formSchema";
import SelectWithUpload from "../../../components/SelectWithUpload";
import { useState } from "react";
import { delay } from "../../../utils/utils";
import { addApplication } from "../../../localDB/dbConfig";
import { Application } from "../../../localDB/types";
import useToast from "../../../components/Layout/Toast/ToastContext";

export default function Form(props: { onSubmit: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const showToast = useToast();
  console.log(getValues());
  const [cvOptions, setCvOptions] = useState(dummyFiles);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  // const [isCVLoading, setCVLoading] = useState<boolean>(false);
  // const [isCLLoading, setCLLoading] = useState<boolean>(false);
  // const [CVs, setCVs] = useState<boolean>([]);
  // const [CLs, setCLs] = useState<boolean>([]);

  const onSubmit = async (data: FieldValues) => {
    // TODO Handle form submission
    console.log(data);
    setSubmitting(true);
    try {
      await addApplication(data as Application);
      props.onSubmit(); // To close modal
      reset();
    } catch (error) {
      showToast((error as Error).message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const onCVUpload = async (file: File) => {
    const fileToAdd = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    setCvOptions((options) => [...options, fileToAdd]);

    await delay(500);
    setValue("cvId", fileToAdd.id);
  };

  const onCoverLetterUpload = async (file: File) => {
    const fileToAdd = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    setCvOptions((options) => [...options, fileToAdd]);

    await delay(500);
    setValue("coverLetterId", fileToAdd.id);
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
        isOptionsLoading={true}
        label="CV"
        errorText={errors.cvId?.message}
        placeHolder="Choose a file"
        options={cvOptions}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCVUpload}
        {...register("cvId")}
      />
      <SelectWithUpload
        isOptionsLoading={true}
        label="Cover Letter"
        errorText={errors.coverLetterId?.message}
        placeHolder="Choose a file"
        options={cvOptions}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCoverLetterUpload}
        {...register("coverLetterId")}
      />
      <div className="w-full flex justify-center p-2">
        <button type="submit" className="btn btn-primary">
          <span className="flex gap-1 items-center">
            Submit
            {isSubmitting && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
