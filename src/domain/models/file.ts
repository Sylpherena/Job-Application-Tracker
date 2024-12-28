export type FileStoreName = "cvFiles" | "coverLetterFiles";

export interface FileRecord {
  id?: string; // Unique string ID
  name: string;
  size: number;
  type: string;
  data: string; // Base64 or binary
  lastModified: number;
  link?: string;
}
