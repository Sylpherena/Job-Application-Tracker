// firebaseApplicationRepo.ts
import {
  Application,
  ApplicationCreate,
  PaginatedApplication,
} from "../../domain/models";
import { ApplicationRepository } from "../../domain/repository";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit as firebaseLimit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  getCountFromServer,
} from "firebase/firestore";
import { indexedDBFileRepo } from "../indexedDB/fileRepository";
import { db } from "./firebaseConnection";

export const firebaseApplicationRepo: ApplicationRepository = {
  addApplication: async function (
    application: ApplicationCreate
  ): Promise<string> {
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

    const newApplication = {
      ...rest,
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
    };

    const docRef = await addDoc(collection(db, "applications"), newApplication);
    return docRef.id;
  },

  getPaginatedApplications: async function (
    page: number,
    limit: number
  ): Promise<PaginatedApplication> {
    const applicationsRef = collection(db, "applications");
    const q = query(
      applicationsRef,
      orderBy("applicationDate"),
      firebaseLimit(limit)
    );

    const countQuery = await getCountFromServer(applicationsRef);
    const totalApplications = countQuery.data().count;
    const totalPages = Math.ceil(totalApplications / limit);

    if (page < 1 || page > totalPages) {
      throw new Error(
        `Invalid page number. Please use a page between 1 and ${totalPages}.`
      );
    }

    let applications: Application[] = [];
    let lastVisible: QueryDocumentSnapshot<DocumentData> | undefined;

    if (page > 1) {
      const previousPageQuery = query(
        applicationsRef,
        orderBy("applicationDate"),
        firebaseLimit((page - 1) * limit)
      );
      const previousPageSnapshot = await getDocs(previousPageQuery);
      lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
    }

    const currentPageQuery = lastVisible
      ? query(
          applicationsRef,
          orderBy("applicationDate"),
          startAfter(lastVisible),
          firebaseLimit(limit)
        )
      : q;

    const currentPageSnapshot = await getDocs(currentPageQuery);
    applications = currentPageSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Application[];

    return {
      applications,
      currentPage: page,
      totalPages,
      totalApplications,
    };
  },
};
