import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDataProvider } from "../../../../providers/data/DataContext";
import { ApplicationCreate, FileRecord } from "../../../../domain/models";

export const useAddApplicationMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { addApplication } = useDataProvider();

  return useMutation({
    mutationFn: (data: ApplicationCreate) => addApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      onSuccess();
    },
  });
};

export const useCVs = () => {
  const { getFiles } = useDataProvider();

  return useQuery({
    queryKey: ["cvs"],
    queryFn: () => getFiles("cvFiles"),
  });
};

export const useCLs = () => {
  const { getFiles } = useDataProvider();

  return useQuery({
    queryKey: ["coverLetters"],
    queryFn: () => getFiles("coverLetterFiles"),
  });
};

export const useAddCVMutation = (onSuccess: (id: string) => void) => {
  const queryClient = useQueryClient();
  const { addFile } = useDataProvider();

  return useMutation({
    mutationFn: (file: FileRecord) => addFile(file, "cvFiles"),
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });

      onSuccess(data);
    },
  });
};

export const useAddCLMutation = (onSuccess: (id: string) => void) => {
  const queryClient = useQueryClient();
  const { addFile } = useDataProvider();

  return useMutation({
    mutationFn: (file: FileRecord) => addFile(file, "coverLetterFiles"),
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });

      onSuccess(data);
    },
  });
};
