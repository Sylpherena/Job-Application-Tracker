import { useQuery } from "@tanstack/react-query";
import {
  getApplicationsPaginated,
  getCoverLetterById,
  getCVById,
} from "../../../localDB/dbConfig";
import { FileRecord } from "../../../localDB/types";
import { FileModalType } from "./FileModal";
import { delay } from "../../../utils/utils";

export const usePaginatedApplications = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["applications", page, limit],
    queryFn: () => getApplicationsPaginated(page, limit),
  });
};

export const useFileData = (fileData: FileModalType | null) => {
  const { id, link, type } = fileData ?? {};
  return useQuery({
    queryKey: ["fileInfo", id, type, link],
    queryFn: async () => {
      let file: FileRecord;

      if (type === "cv") {
        file = await getCVById(id!);
      } else {
        file = await getCoverLetterById(id!);
      }

      let createdLink: string | undefined;
      if (!link) {
        const blob = new Blob([file.data], { type: file.type });
        createdLink = URL.createObjectURL(blob);
      }
      await delay(500);
      return { ...file, link: link ?? createdLink };
    },
    enabled: !!id,
  });
};
