import { notUndefined, useVirtualizer } from '@tanstack/react-virtual';
import type { MutableRefObject } from 'react';

// Cell height needs to be consistent for each row
const CELL_HEIGHT = 31;

// Number of rows to render before and after viewport.
const OVERSCAN = 6;

export type Props = {
  /** Total number of rows */
  rowsCount: number;
  /** Reference to the table container element, which has scroll */
  scrollRef: MutableRefObject<HTMLElement | null>;
};

export const useVirtualRows = ({ rowsCount, scrollRef }: Props) => {
  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CELL_HEIGHT,
    overscan: OVERSCAN,
  });

  // This will replace "real" rows for rendering
  const virtualRows = virtualizer.getVirtualItems();

  /**
   * This is required to fix the issue with sticky table header rendering.
   * @see DataTable
   */
  const [before, after] =
    virtualRows.length > 0
      ? [
          notUndefined(virtualRows[0]).start - virtualizer.options.scrollMargin,
          virtualizer.getTotalSize() -
            notUndefined(virtualRows[virtualRows.length - 1]).end,
        ]
      : [0, 0];

  return { virtualRows, before, after };
};
