import { FieldValues, useForm } from "react-hook-form";
import InputWithLabel from "../../components/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate, formSchema } from "./addFormSchema";

function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationDate: formatDate(new Date()),
      position: null,
      company: null,
      country: null,
      location: null,
      cv: null,
      coverLetter: null,
    },
  });

  const onSubmit = (data: FieldValues) => {
    // Handle form submission
    console.log(data);
  };
  console.log(getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control p-2">
        <InputWithLabel
          label="Application Date"
          type="date"
          errorText={errors.applicationDate?.message as string}
          {...register("applicationDate")}
        />
      </div>
      <div className="flex w-full gap-4">
        <InputWithLabel
          label="Position"
          placeholder="Enter position"
          errorText={errors.position?.message as string}
          {...register("position")}
        />
        <InputWithLabel
          label="Company"
          placeholder="Enter Company"
          errorText={errors.company?.message as string}
          {...register("company")}
        />
      </div>
      <div className="flex w-full gap-4">
        <InputWithLabel
          label="Country"
          placeholder="Enter position"
          errorText={errors.country?.message as string}
          {...register("country")}
        />
        <InputWithLabel
          label="Location"
          placeholder="Enter position"
          errorText={errors.location?.message as string}
          {...register("location")}
        />
      </div>
      <InputWithLabel
        label="CV"
        type="file"
        errorText={errors.cv?.message as string}
        {...register("cv")}
      />
      <InputWithLabel
        label="Cover Letter"
        type="file"
        errorText={errors.coverLetter?.message as string}
        {...register("coverLetter")}
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddForm;
