import { z } from "zod";
import { formatDate } from "../../../utils/utils";

export interface FormType {
  applicationDate: string;
  position: string;
  company: string;
  country: string;
  location: string;
  cvId: string;
  coverLetterId: string;
}

export const defaultFormValues = {
  applicationDate: formatDate(new Date()),
  position: "",
  company: "",
  country: "",
  location: "",
  cv: "",
  coverLetter: "",
};

export const formSchema = z.object({
  applicationDate: z
    .string()
    .nonempty({ message: "Application Date is required" }),
  company: z.string().nonempty({ message: "Company is required" }),
  position: z.string().nonempty({ message: "Position is required" }),
  country: z.string(),
  location: z.string(),
  cvId: z.string().nonempty({ message: "CV is required" }),
  coverLetterId: z.string(),
});
