import { z } from "zod";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// TODO delete dummy data and type after backend integration
export const dummyFiles: DummyFile[] = [
  { id: "1", name: "Report.pdf", size: 321344, type: "PDF" },
  { id: "2", name: "Presentation.pptx", size: 879613, type: "PowerPoint" },
  { id: "3", name: "Image.jpg", size: 452135, type: "Image" },
  { id: "4", name: "Spreadsheet.xlsx", size: 886544, type: "Excel" },
  { id: "5", name: "Document.docx", size: 877963, type: "Word Document" },
];

export interface DummyFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

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
  cvId: z.string(), //.nonempty({ message: "CV is required" }),
  coverLetterId: z.string(),
});
