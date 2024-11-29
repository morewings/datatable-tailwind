import { FC } from 'react';

export type Props = {
  /**
   * Provide the title for the column
   */
  title: string;
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <Cell columnWidth={props.column.getSize()} /> }
   */
  columnWidth: number;
};

export const HeaderCell: FC<Props> = ({ title, columnWidth }) => {
  return (
    <div className="p-1.5 font-semibold" style={{ width: columnWidth }}>
      {title}
    </div>
  );
};
