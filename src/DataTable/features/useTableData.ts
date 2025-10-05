import { useCallback, useEffect, useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { EditState, Row } from '../types.ts';

export type Props = {
  tableDataProp: Row[];
  rowSelection: RowSelectionState;
  clearSelection: () => void;
  onEdit: (editState: EditState) => void;
};

export const useTableData = ({ tableDataProp, rowSelection, clearSelection, onEdit }: Props) => {
  const [tableData, setTableData] = useState(() => [...tableDataProp]);

  useEffect(() => {
    setTableData(() => [...tableDataProp]);
  }, [tableDataProp]);

  const deleteRows = useCallback(() => {
    const normalizedRows = Object.keys(rowSelection).map((rowIndex) =>
      Number(rowIndex),
    );
    const rowsToDelete = new Set(normalizedRows)
    const nextTableData = tableData.filter((_, i) => !rowsToDelete.has(i));
    setTableData(nextTableData);
    const editState: EditState = Object.fromEntries(
      normalizedRows.map(rowIndex => [rowIndex, false])
    );
    onEdit(editState)
    clearSelection();
  }, [clearSelection, onEdit, rowSelection, tableData]);

  return { deleteRows, tableData, setTableData };
};
