import '@tanstack/react-table';
import { Row, ContentTypes } from './types.ts';

declare module '@tanstack/react-table' {
  // Extend table meta data with `locale` property
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-unused-vars
  interface TableMeta<TData extends Row> {
    locale: string;
    openFilterDialog: (columnId: string) => void;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends Row, unknown> {
    contentType: keyof typeof ContentTypes;
    title: string;
  }
  // Extend built-in table sorting functions
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface SortingFns {
    countryCodesToNames: SortingFn<unknown>;
  }
  // Extend built-in table filter functions
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FilterFns {
    isBiggerNumber: FilterFn<Row[]>;
    isAfterDate: FilterFn<Row[]>;
  }
}
