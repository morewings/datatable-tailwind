import { FC, useCallback } from 'react';
import { HeaderContext } from '@tanstack/react-table';
import { Row } from '../types.ts';
import { Checkbox } from '../inputs/Checkbox.tsx';

export type Props = {
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <SelectionHeaderCell columnWidth={props.column.getSize()} /> }
   */
  columnWidth: number;
  /**
   * Provide a header context to be used in column actions
   * @see https://tanstack.com/table/latest/docs/guide/headers
   */
  context: HeaderContext<Row, unknown>;
};

export const SelectionHeaderCell: FC<Props> = ({ columnWidth, context }) => {
  const handleChange = useCallback(() => {
    context.table.toggleAllRowsSelected()

  }, [context.table])
  return (
    <div
      className="flex items-center px-2 py-1.5"
      style={{ width: columnWidth }}
    >
      <Checkbox
        className="text-white/80 dark:text-textDark/60"
        disabled={false}
        onChange={handleChange}
        checked={context.table.getIsAllRowsSelected()}
        indeterminate={context.table.getIsSomeRowsSelected()}
      />
    </div>
  );
};
