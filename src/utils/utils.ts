import { FileRecord } from "../localDB/types";

//TODO Delete
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fileToBase64(file: File) {
  const fileData = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return fileData;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export async function fileToFileRecord(file: File) {
  const fileData = await fileToBase64(file);

  const fileRecord: FileRecord = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModifiedDate: formatDate(new Date(file.lastModified)),
    data: fileData,
  };

  return fileRecord;
}
