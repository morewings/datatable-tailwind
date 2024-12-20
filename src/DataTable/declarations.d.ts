import '@tanstack/react-table';
import { Row } from './types.ts';

declare module '@tanstack/react-table' {
  // Extend table meta data with `locale` property
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-unused-vars
  interface TableMeta<TData extends Row> {
    locale: string;
  }
  // Extend built-in table sorting functions with `sortCountryNames`
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface SortingFns {
    countryCodesToNames: SortingFn<unknown>
  }
}
