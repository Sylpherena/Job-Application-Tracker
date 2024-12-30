import React from "react";
import { DataContext } from "./DataContext";
import { indexedDBFileRepo } from "../../data/indexedDB/fileRepository";
import { firebaseApplicationRepo } from "../../data/firebase/applicationRepository";
import { firebaseUserRepo } from "../../data/firebase/userRepository";

export default function DataProvider(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <DataContext.Provider
      value={{
        ...firebaseApplicationRepo,
        ...indexedDBFileRepo,
        ...firebaseUserRepo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
