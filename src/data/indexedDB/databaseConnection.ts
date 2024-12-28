import { DBSchema, openDB } from "idb";
import { Application, FileRecord } from "../../domain/models";

// Define the database schema
interface ApplicationTrackerDB extends DBSchema {
  applications: {
    key: string;
    value: Application;
  };
  cvFiles: {
    key: string;
    value: FileRecord;
  };
  coverLetterFiles: {
    key: string;
    value: FileRecord;
  };
}

export const databaseConnection = openDB<ApplicationTrackerDB>(
  "ApplicationTrackerDB",
  1,
  {
    upgrade(db) {
      // Create the applications store
      if (!db.objectStoreNames.contains("applications")) {
        db.createObjectStore("applications", {
          keyPath: "id",
        });
      }
      // Create the cvFiles store
      if (!db.objectStoreNames.contains("cvFiles")) {
        db.createObjectStore("cvFiles", { keyPath: "id" });
      }
      // Create the coverLetterFiles store
      if (!db.objectStoreNames.contains("coverLetterFiles")) {
        db.createObjectStore("coverLetterFiles", {
          keyPath: "id",
        });
      }
    },
  }
);
