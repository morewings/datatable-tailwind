import { FC, useCallback } from 'react';
import { TableDialog } from './TableDialog.tsx';
import { formatRowsAmount } from './../features/formatRowsAmount.ts';
import { Button } from '../inputs/Button.tsx';

export type Props = {
  /**
   * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
   * or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
   */
  locale: string;
  /**
   * Number of rows to delete
   */
  rowsAmount: number;
  /** Whether the modal is currently visible. */
  isOpen: boolean;
  /** Callback invoked when the user cancels or closes the dialog. */
  onClose: () => void;
  /** Callback invoked when the user confirms the delete action. */
  onDelete: () => void;
};

export const DeleteDialog: FC<Props> = ({
  locale,
  rowsAmount,
  isOpen,
  onClose,
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    onDelete();
    onClose();
  }, [onClose, onDelete]);
  return (
    <TableDialog title="Confirm deletion" open={isOpen} onClose={onClose}>
      <div className="text-white/80">
        Do you want to delete{' '}
        <span className="font-semibold tabular-nums">
          {formatRowsAmount(rowsAmount, locale)}
        </span>{' '}
        row(s)?
      </div>
      <div className="mt-6 flex justify-evenly gap-3">
        <Button
          className="min-w-32"
          onClick={onClose}
          title="Cancel"
          icon="hand-palm"
        />
        <Button
          className="min-w-32"
          onClick={handleDelete}
          title="Delete"
          icon="trash"
        />
      </div>
    </TableDialog>
  );
};
