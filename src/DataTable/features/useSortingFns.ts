import { Row as TableRow, SortingFn } from '@tanstack/react-table';
import { useCallback } from 'react';
import { Row } from './../types.ts';

export const useSortingFns = (locale?: string) => {
  const countryCodesToNames: SortingFn<Row[]> = useCallback(
    (left: TableRow<Row[]>, right: TableRow<Row[]>, id: string) => {
      const leftName = new Intl.DisplayNames(locale, { type: 'region' }).of(
        left.getValue(id),
      );
      const rightName = new Intl.DisplayNames(locale, { type: 'region' }).of(
        right.getValue(id),
      );
      return typeof leftName === 'string' && typeof rightName === 'string'
        ? new Intl.Collator(locale).compare(leftName, rightName)
        : 0;
    },
    [locale],
  );
  return { countryCodesToNames };
};
