import React from "react";
import { DataContext } from "./DataContext";
import { indexedDBApplicationRepo } from "../../data/indexedDB/applicationRepository";
import { indexedDBFileRepo } from "../../data/indexedDB/fileRepository";

export default function DataProvider(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <DataContext.Provider
      value={{
        ...indexedDBApplicationRepo,
        ...indexedDBFileRepo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
