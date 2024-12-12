import { z } from "zod";

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const formSchema = z.object({
  applicationDate: z
    .string()
    .nonempty({ message: "Application Date is required" }),
  company: z.string().nonempty({ message: "Company is required" }),
  position: z.string().nonempty({ message: "Position is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  cv: z
    .any()
    .refine((files) => files?.length === 1, { message: "CV is required" })
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
      message: "CV must be less than 5MB",
    })
    .refine((files) => ["application/pdf"].includes(files?.[0]?.type), {
      message: "CV must be a PDF",
    }),
  coverLetter: z
    .any()
    .refine((files) => files?.length === 1, {
      message: "Cover Letter is required",
    })
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
      message: "Cover Letter must be less than 5MB",
    })
    .refine((files) => ["application/pdf"].includes(files?.[0]?.type), {
      message: "Cover Letter must be a PDF",
    }),
});
