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

export default function Form(props: { onSubmit: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const [cvOptions, setCvOptions] = useState(dummyFiles);

  const onSubmit = (data: FieldValues) => {
    // TODO Handle form submission
    console.log(data);
    props.onSubmit();
    reset();
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
    setValue("cv", fileToAdd.id);
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
    setValue("coverLetter", fileToAdd.id);
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
        label="CV"
        errorText={errors.cv?.message}
        placeHolder="Choose a file"
        options={cvOptions}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCVUpload}
        {...register("cv")}
      />
      <SelectWithUpload
        label="Cover Letter"
        errorText={errors.coverLetter?.message}
        placeHolder="Choose a file"
        options={cvOptions}
        getOptionLabel={(file) => `${file.name}`}
        getOptionValue={(file) => file.id}
        onUpload={onCoverLetterUpload}
        {...register("coverLetter")}
      />
      <div className="w-full flex justify-center p-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
