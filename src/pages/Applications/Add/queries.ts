import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApplicationCreate, FileRecord } from "../../../localDB/types";
import {
  addApplication,
  addCoverLetterFile,
  addCVFile,
  getCoverLetterFiles,
  getCVFiles,
} from "../../../localDB/dbConfig";

export const useAddApplicationMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApplicationCreate) => addApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      onSuccess();
    },
  });
};

export const useCVs = () => {
  return useQuery({
    queryKey: ["cvs"],
    queryFn: () => getCVFiles(),
  });
};

export const useCLs = () => {
  return useQuery({
    queryKey: ["coverLetters"],
    queryFn: () => getCoverLetterFiles(),
  });
};

export const useAddCVMutation = (onSuccess: (id: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: FileRecord) => addCVFile(file),
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });

      onSuccess(data);
    },
  });
};

export const useAddCLMutation = (onSuccess: (id: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: FileRecord) => addCoverLetterFile(file),
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });

      onSuccess(data);
    },
  });
};
