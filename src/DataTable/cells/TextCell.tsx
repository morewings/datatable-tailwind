import { FC } from 'react';

export type Props = {
  /**
   * Provide the value to render in the cell
   */
  value?: string;
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <Cell columnWidth={props.column.getSize()} /> }
   */
  columnWidth: number;
};

export const TextCell: FC<Props> = ({ value, columnWidth }) => {
  return (
    <div
      className="truncate p-1.5"
      title={value}
      style={{ width: columnWidth }}
    >
      {value}
    </div>
  );
};
