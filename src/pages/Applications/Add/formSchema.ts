import { z } from "zod";

export interface ApplicationFormType {
  applicationDate: Date;
  position: string;
  company: string;
  country: string;
  location: string;
  cv: { id: string };
  coverLetter: { id: string };
}

export const defaultFormValues = {
  applicationDate: new Date(),
  position: "",
  company: "",
  country: "",
  location: "",
  cv: { id: "" },
  coverLetter: { id: "" },
};

export const formSchema = z.object({
  applicationDate: z.coerce.date({
    required_error: "Application Date is required",
    invalid_type_error: "Invalid date format",
  }),
  company: z.string().nonempty({ message: "Company is required" }),
  position: z.string().nonempty({ message: "Position is required" }),
  country: z.string(),
  location: z.string(),
  cv: z.object({ id: z.string().nonempty({ message: "CV is required" }) }),
  coverLetter: z.object({ id: z.string() }),
});
