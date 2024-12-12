import { FieldValues, useForm } from "react-hook-form";
import InputWithLabel from "../../../../components/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultFormValues, formSchema } from "./formSchema";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = (data: FieldValues) => {
    // Handle form submission
    console.log(data);
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
      <InputWithLabel
        label="CV"
        type="file"
        errorText={errors.cv?.message}
        {...register("cv")}
      />
      <InputWithLabel
        label="Cover Letter"
        type="file"
        errorText={errors.coverLetter?.message}
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
