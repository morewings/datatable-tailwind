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

  // Memoization is required to preserve referential equality of the resulting array
  return useMemo<ColumnAction[]>(
    () => [
      {
        // Use ternary expression to decide which label text or icon to render, according to the pinning state
        label: isPinned !== 'left' ? 'Pin left' : 'Unpin left',
        icon:
          isPinned !== 'left' ? (
            <Icon name="push-pin" className="text-lg" />
          ) : (
            <Icon name="push-pin-simple-slash" className="text-lg" />
          ),
        onClick: () => {
          // Conditionally set or unset column pinning state using TanStack table API
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
    ],
    [context, isPinned],
  );
};
