import { openDB, DBSchema } from "idb";
import { Application, FileRecord } from "./types";
import { v4 as uuid } from "uuid";

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

// Open the database
const dbPromise = openDB<ApplicationTrackerDB>("ApplicationTrackerDB", 1, {
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
});

// Add a new application
export async function addApplication(application: Application) {
  const db = await dbPromise;
  return db.add("applications", { id: uuid(), ...application });
}

// Add a new cvFile
export async function addCVFile(file: FileRecord) {
  const db = await dbPromise;
  return db.add("cvFiles", { id: uuid(), ...file });
}
// Add a new coverLetterFile
export async function addCoverLetterFile(file: FileRecord) {
  const db = await dbPromise;
  return db.add("coverLetterFiles", { id: uuid(), ...file });
}

// Fetch applications
export async function getApplicationsPaginated(page: number, limit: number) {
  const db = await dbPromise;
  const store = db
    .transaction("applications", "readonly")
    .objectStore("applications");

  const totalApplications = await store.count(); // Total number of applications

  if (totalApplications === 0) {
    return {
      applications: [],
      currentPage: 1,
      totalPages: 1,
      totalApplications: 0,
    };
  }
  const totalPages = Math.ceil(totalApplications / limit); // Total pages based on limit

  if (page < 1 || page > totalPages) {
    throw new Error(
      `Invalid page number. Please use a page between 1 and ${totalPages}.`
    );
  }

  const offset = (page - 1) * limit;
  const applications: Application[] = [];

  let cursor = await store.openCursor();

  let currentIndex = 0;
  while (cursor) {
    if (currentIndex >= offset && currentIndex < offset + limit) {
      applications.push(cursor.value);
    }
    currentIndex++;
    if (applications.length >= limit) break;
    cursor = await cursor.continue();
  }

  return {
    applications,
    currentPage: page,
    totalPages,
    totalApplications,
  };
}

// Fetch cvFiles
export async function getCVFiles() {
  const db = await dbPromise;
  return db.getAll("cvFiles");
}

// Fetch coverLetterFiles
export async function getCoverLetterFiles() {
  const db = await dbPromise;
  return db.getAll("coverLetterFiles");
}

// Get Application by ID
export async function getApplicationById(id: string) {
  const db = await dbPromise;
  const application = await db.get("applications", id);

  if (!application) {
    throw new Error(`Application with ID ${id} not found`);
  }

  return application;
}
