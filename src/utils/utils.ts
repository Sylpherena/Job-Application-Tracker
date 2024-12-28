import { FileRecord } from "../domain/models";

//TODO Delete
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fileToBase64(file: File) {
  const fileData = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

  return fileData;
}

export async function fileToFileRecord(file: File) {
  const fileData = await fileToBase64(file);

  const fileRecord: FileRecord = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    data: fileData,
  };

  return fileRecord;
}

export function formatFileSize(
  bytes: number,
  decimalPlaces: number = 1
): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPlaces));

  return `${size} ${sizes[i]}`;
}

export function formatFileName(name: string): string {
  let formattedName = "";
  const extension = name.slice(name.lastIndexOf(".") + 1, name.length);
  if (name.length > 30) {
    const nameWithoutExtension = name.replace(extension, "");
    formattedName = nameWithoutExtension.slice(0, 30);
    return `${formattedName}...${extension}`;
  }
  return name;
}
