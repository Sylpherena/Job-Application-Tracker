import { createContext, useContext } from "react";
import { ApplicationRepository, FileRepository } from "../../domain/repository";

export const DataContext = createContext<
  ApplicationRepository & FileRepository
>({} as ApplicationRepository & FileRepository);

export const useDataProvider = () => useContext(DataContext);
