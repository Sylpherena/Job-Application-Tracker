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
import {
  ApplicationSortableField,
  SortDirection,
} from "../../domain/models/application";

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
    limit: number,
    sort: { sortBy: ApplicationSortableField; directionStr: SortDirection } = {
      sortBy: "applicationDate",
      directionStr: "desc",
    }
  ): Promise<PaginatedApplication> {
    const db = await databaseConnection;
    const store = db
      .transaction("applications", "readonly")
      .objectStore("applications");

    const totalApplications = await store.count();

    if (totalApplications === 0) {
      await delay(500);
      return {
        applications: [],
        currentPage: 1,
        totalPages: 1,
        totalApplications: 0,
      };
    }

    const totalPages = Math.ceil(totalApplications / limit);

    if (page < 1 || page > totalPages) {
      throw new Error(
        `Invalid page number. Please use a page between 1 and ${totalPages}.`
      );
    }

    const allApplications: Application[] = [];
    let cursor = await store.openCursor();

    while (cursor) {
      allApplications.push(cursor.value);
      cursor = await cursor.continue();
    }

    // Sorting logic
    allApplications.sort((a, b) => {
      const fieldA = a[sort.sortBy];
      const fieldB = b[sort.sortBy];
      if (fieldA < fieldB) return sort.directionStr === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sort.directionStr === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination logic
    const offset = (page - 1) * limit;
    const applications = allApplications.slice(offset, offset + limit);

    await delay(500);
    return {
      applications,
      currentPage: page,
      totalPages,
      totalApplications,
    };
  },
};
