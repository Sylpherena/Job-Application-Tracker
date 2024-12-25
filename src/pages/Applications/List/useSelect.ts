import { useMemo, useState } from "react";

export type SelectAllState = "checked" | "indeterminate" | "unchecked";

export function useSelect(ids: string[], isLoading: boolean = false) {
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: boolean }>(
    {}
  );

  const selectAllState: SelectAllState = useMemo(() => {
    if (ids.some((id) => selectedItems[id] === true)) {
      if (ids.every((id) => selectedItems[id] === true)) {
        return "checked";
      }
      return "indeterminate";
    }
    return "unchecked";
  }, [selectedItems, ids]);

  const handleSelectAll = () => {
    if (!isLoading && !!ids) {
      const selectAllResult = { ...selectedItems };

      if (selectAllState === "indeterminate" || selectAllState === "checked") {
        ids.forEach((id) => {
          if (selectAllResult[id]) {
            delete selectAllResult[id];
          }
        });
      }
      if (selectAllState === "unchecked") {
        ids.forEach((id) => (selectAllResult[id] = true));
      }

      setSelectedItems(selectAllResult);
    }
  };

  const handleSelect = (id: string) => {
    if (!isLoading && !!ids) {
      const selectAllResult = { ...selectedItems };

      if (selectAllResult[id] === true) {
        delete selectAllResult[id];
      } else {
        selectAllResult[id] = true;
      }
      setSelectedItems(selectAllResult);
    }
  };

  return {
    selectAllState,
    handleSelectAll,
    handleSelect,
    selectedItems,
  };
}
