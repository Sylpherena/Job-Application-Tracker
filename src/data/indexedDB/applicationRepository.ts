import {
  Application,
  ApplicationCreate,
  PaginatedApplication,
} from "../../domain/models";
import { ApplicationRepository } from "../../domain/repository";
import { delay } from "../../utils/utils";
import { databaseConnection } from "./databaseConnection";
import { v4 as uuid } from "uuid";
import { indexedDBFileRepo } from "./fileRepository";

export const indexedDBApplicationRepo: ApplicationRepository = {
  addApplication: async function (
    application: ApplicationCreate
  ): Promise<string> {
    const db = await databaseConnection;
    await delay(500);

    const {
      applicationDate,
      coverLetter: clFromForm,
      cv: cvFromForm,
      ...rest
    } = application;

    const cv = await indexedDBFileRepo.getFileById(cvFromForm.id, "cvFiles");
    let coverLetter = null;

    if (clFromForm?.id) {
      coverLetter = await indexedDBFileRepo.getFileById(
        clFromForm.id,
        "coverLetterFiles"
      );
    }

    return db.add("applications", {
      ...rest,
      id: uuid(),
      applicationDate: applicationDate.getTime(),
      cv: {
        id: cv.id!,
        name: cv.name,
        lastModified: cv.lastModified,
      },
      coverLetter: coverLetter
        ? {
            id: coverLetter.id!,
            name: coverLetter.name,
            lastModified: coverLetter.lastModified,
          }
        : null,
    });
  },
  getPaginatedApplications: async function (
    page: number,
    limit: number
  ): Promise<PaginatedApplication> {
    const db = await databaseConnection;
    const store = db
      .transaction("applications", "readonly")
      .objectStore("applications");

    const totalApplications = await store.count(); // Total number of applications

    if (totalApplications === 0) {
      await delay(500);
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

    await delay(500);
    return {
      applications,
      currentPage: page,
      totalPages,
      totalApplications,
    };
  },
};
