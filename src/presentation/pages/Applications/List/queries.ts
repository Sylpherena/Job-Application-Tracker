import { useQuery } from "@tanstack/react-query";
import { FileModalState } from "./FileModal";
import { useDataProvider } from "../../../../providers/data/DataContext";
import { FileRecord } from "../../../../domain/models";

export const usePaginatedApplications = (page: number, limit: number) => {
  const { getPaginatedApplications } = useDataProvider();

  return useQuery({
    queryKey: ["applications", page, limit],
    queryFn: () => getPaginatedApplications(page, limit),
  });
};

export const useFileData = (fileData: FileModalState | null) => {
  const { getFileById } = useDataProvider();
  const { id, link, type } = fileData ?? {};
  return useQuery({
    queryKey: ["fileInfo", id, type, link],
    queryFn: async () => {
      let file: FileRecord;

      if (type === "cv") {
        file = await getFileById(id!, "cvFiles");
      } else {
        file = await getFileById(id!, "coverLetterFiles");
      }

      let createdLink: string | undefined;

      if (link) {
        return file;
      } else {
        const blob = new Blob([file.data], { type: file.type });
        createdLink = URL.createObjectURL(blob);
      }

      return { ...file, link: link ?? createdLink };
    },
    enabled: !!id,
  });
};
