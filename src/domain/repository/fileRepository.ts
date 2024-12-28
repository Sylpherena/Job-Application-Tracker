import { FileRecord, FileStoreName } from "../models";

export interface FileRepository {
  addFile(file: FileRecord, fileStoreName: FileStoreName): Promise<string>;
  getFileById(id: string, fileStoreName: FileStoreName): Promise<FileRecord>;
  getFiles(fileStoreName: FileStoreName): Promise<FileRecord[]>;
}
