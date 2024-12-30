import { createContext, useContext } from "react";
import {
  ApplicationRepository,
  FileRepository,
  UserRepository,
} from "../../domain/repository";

export const DataContext = createContext<
  ApplicationRepository & FileRepository & UserRepository
>({} as ApplicationRepository & FileRepository & UserRepository);

export const useDataProvider = () => useContext(DataContext);
