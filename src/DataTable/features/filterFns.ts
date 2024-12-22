import { FilterFn } from '@tanstack/react-table';

import { Row } from '../types.ts';

export const isBiggerNumber: FilterFn<Row[]> = (
  row,
  columnId,
  filterValue: number,
) => {
  return row.getValue<number>(columnId) > filterValue;
};

export const isAfterDate: FilterFn<Row[]> = (
  row,
  columnId,
  filterValue: Date,
) => {
  const cellDate = new Date(row.getValue(columnId));
  return cellDate.getTime() > filterValue.getTime();
};

isAfterDate.resolveFilterValue = (filterValue) => {
  return new Date(filterValue);
};
