import { useCallback, useEffect, useState } from 'react';
import { RowSelectionState, Updater } from '@tanstack/react-table';

export type Props = {
  rowSelectionProp: RowSelectionState;
  onRowSelect: (rowSelectionState: RowSelectionState) => void;
};

export const useRowSelection = ({ rowSelectionProp, onRowSelect }: Props) => {
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(rowSelectionProp);
  useEffect(() => {
    setRowSelection(rowSelectionProp);
  }, [rowSelectionProp]);
  const handleRowSelection = useCallback(
    (nextSelectionState: Updater<RowSelectionState>) => {
      setRowSelection(nextSelectionState);
      if (typeof nextSelectionState === 'function') {
        onRowSelect(nextSelectionState(rowSelection));
      } else {
        onRowSelect(nextSelectionState);
      }
    },
    [onRowSelect, rowSelection],
  );
  return { rowSelection, handleRowSelection };
};
