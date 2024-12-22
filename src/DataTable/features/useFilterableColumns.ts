import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Row, ContentTypes } from '../types.ts';

/**
 * Column definition to use in Dialogs
 */
export type Column = {
  id: string;
  title: string;
  contentType: keyof typeof ContentTypes;
};

export const useFilterableColumns = (table: Table<Row>): Column[] => {
  return useMemo(
    () =>
      table
        // get table columns config using TanStack API
        .getAllColumns()
        // create an array with the data needed for Filter Dialog
        .map((column) => {
          return {
            title: column.columnDef.meta?.title as string,
            contentType: column.columnDef.meta
              ?.contentType as keyof typeof ContentTypes,
            id: column.id,
            filterable: column?.getCanFilter(),
            filterValue: column?.getFilterValue(),
          };
        })
        // remove columns where filtering is disabled
        .filter(({ filterable }) => filterable)
        // clean up redundant filterable property
        .map(({ filterable, ...restProps }) => ({
          ...restProps,
        })),
    [table],
  );
};
