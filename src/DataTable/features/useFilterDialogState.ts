import { useState, useCallback } from 'react';

/**
 * Create a state required for the filter dialog
 */
export const useFilterDialogState = () => {
  const [open, setOpen] = useState(false);
  const [columnId, setColumnId] = useState<string>();

  /**
   * Open the filter dialog and capture the target column id
   */
  const openDialog = useCallback((selectedId: string) => {
    setColumnId(selectedId);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return { openDialog, isOpen: open, closeDialog, selectedId: columnId };
};
