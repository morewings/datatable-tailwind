import { useMemo, ReactNode } from 'react';
import { HeaderContext } from '@tanstack/react-table';
import { Row } from '../types.ts';
import { Icon } from '../../Icon.tsx';

type ColumnAction = {
  /** Name of the action to display in the dropdown menu */
  label: string;
  /** Will be shown on the left from the action label */
  icon: ReactNode;
  /** Callback when a user clicks an action button */
  onClick: () => void;
};

/**
 * React hook which returns an array of table column actions config objects
 */
export const useColumnActions = (
  context: HeaderContext<Row, unknown>,
): ColumnAction[] => {
  // Get pinning position using TanStack table API
  const isPinned = context.column.getIsPinned();

  // Get column sorting state using TanStack table API
  const isSorted = context.column.getIsSorted();

  // Get column filter state using TanStack table API
  const isFiltered = context.column.getIsFiltered();

  // Memoization is required to preserve referential equality
  // of the resulting array
  return useMemo<ColumnAction[]>(
    () => [
      {
        // Use ternary expression to decide which label text or icon
        // to render, according to the pinning state
        label: isPinned !== 'left' ? 'Pin left' : 'Unpin left',
        icon:
          isPinned !== 'left' ? (
            <Icon name="push-pin" className="text-lg" />
          ) : (
            <Icon name="push-pin-simple-slash" className="text-lg" />
          ),
        onClick: () => {
          // Conditionally set or unset column pinning state
          // using TanStack table API
          if (isPinned !== 'left') {
            context.column.pin('left');
          } else {
            context.column.pin(false);
          }
        },
      },
      {
        label: isPinned !== 'right' ? 'Pin right' : 'Unpin right',
        icon:
          isPinned !== 'right' ? (
            <Icon name="push-pin" className="-scale-x-100 text-lg" />
          ) : (
            <Icon name="push-pin-simple-slash" className="text-lg" />
          ),
        onClick: () => {
          if (isPinned !== 'right') {
            context.column.pin('right');
          } else {
            context.column.pin(false);
          }
        },
      },
      {
        // Use ternary expression to decide which label text
        // or icon to render, according to the sorting state
        label: isSorted !== 'asc' ? 'Sort ascending' : 'Clear ascending',
        icon:
          isSorted !== 'asc' ? (
            <Icon name="sort-ascending" className="text-lg" />
          ) : (
            <Icon name="shuffle" className="text-lg" />
          ),
        onClick: () => {
          // Conditionally set or unset column sorting state using TanStack table API
          if (isSorted !== 'asc') {
            context.table.setSorting([{ desc: false, id: context.column.id }]);
          } else {
            context.column.clearSorting();
          }
        },
      },
      {
        label: isSorted !== 'desc' ? 'Sort descending' : 'Clear descending',
        icon:
          isSorted !== 'desc' ? (
            <Icon name="sort-descending" className="text-lg" />
          ) : (
            <Icon name="shuffle" className="text-lg" />
          ),
        onClick: () => {
          if (isSorted !== 'desc') {
            context.table.setSorting([{ desc: true, id: context.column.id }]);
          } else {
            context.column.clearSorting();
          }
        },
      },
      {
        label: !isFiltered ? 'Apply filter' : 'Edit/Remove filter',
        icon: <Icon name="funnel" className="text-lg" />,
        onClick: () => {
          context.table.options.meta?.openFilterDialog(context.column.id);
        },
      },
    ],
    [context.column, context.table, isFiltered, isPinned, isSorted],
  );
};
