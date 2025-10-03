import { useCallback, useState } from 'react';

export const useDeleteDialogState = () => {
  const [isOpen, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [])

  return {isOpen, openDialog, closeDialog}
}