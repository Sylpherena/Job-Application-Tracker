import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";
import { useDataProvider } from "../data/DataContext";

export const useDetailedUser = (user: FirebaseUser | null | undefined) => {
  const { getUserDetails } = useDataProvider();

  return useQuery({
    queryKey: ["user", user],
    queryFn: () => getUserDetails(user!),
    enabled: !!user,
  });
};
