import { useQuery } from "@tanstack/react-query";
import { getApplicationsPaginated } from "../../../localDB/dbConfig";

export const usePaginatedApplications = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["applications", page, limit],
    queryFn: () => getApplicationsPaginated(page, limit),
  });
};
