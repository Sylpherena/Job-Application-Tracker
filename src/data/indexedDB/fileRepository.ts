import { FileRecord, FileStoreName } from "../../domain/models";
import { FileRepository } from "../../domain/repository/fileRepository";
import { databaseConnection } from "./databaseConnection";
import { v4 as uuid } from "uuid";
import { delay } from "../../utils/utils";

export const indexedDBFileRepo: FileRepository = {
  addFile: async function (
    file: FileRecord,
    fileStoreName: FileStoreName
  ): Promise<string> {
    const db = await databaseConnection;
    await delay(500);
    return db.add(fileStoreName, { id: uuid(), ...file });
  },
  getFileById: async function (
    id: string,
    fileStoreName: FileStoreName
  ): Promise<FileRecord> {
    const db = await databaseConnection;
    await delay(500);
    const file = await db.get(fileStoreName, id);

    if (!file) {
      throw new Error(`File with ID ${id} not found`);
    }

    return file;
  },
  getFiles: async function (
    fileStoreName: FileStoreName
  ): Promise<FileRecord[]> {
    const db = await databaseConnection;
    await delay(500);
    return db.getAll(fileStoreName);
  },
};
