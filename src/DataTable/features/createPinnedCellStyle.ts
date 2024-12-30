import { CSSProperties } from 'react';
import { Header, Cell } from '@tanstack/react-table';
import { Row } from '../types.ts';

export type Props = {
  /** Index of the cell in the Row array */
  index: number;
  /** Length of the Row array */
  rowLength: number;
  /** Column context for the Cell or Header */
  context: Header<Row, unknown> | Cell<Row, unknown>;
};

/**
 * Style helper function creates CSS Properties object with the left of right property
 * calculated according to the pinning position
 */
export const createPinnedCellStyle = ({
  index,
  rowLength,
  context,
}: Props): CSSProperties | undefined => {
  // Get column pinning position using TanStack table API
  const pinPosition = context.column.getIsPinned();

  // Calculate fixes for table border size
  const bordersLeft = index !== 0 ? index + 1 : 0;
  const bordersRight = index === rowLength ? 0 : rowLength - (index + 1);

  // Create left and right CSS style objects
  const leftStyle = {
    left: context.column.getStart('left') + bordersLeft,
  };
  const rightStyle = {
    right: context.column.getAfter('right') + bordersRight,
  };

  // Decide which object to return, according to the column pin position
  switch (pinPosition) {
    case 'left': {
      return leftStyle;
    }
    case 'right': {
      return rightStyle;
    }
    default: {
      return undefined;
    }
  }
};
