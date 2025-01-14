import { createColumnHelper } from '@tanstack/react-table';
import { Row, ContentTypes } from './types.ts';
import { HeaderCell } from './cells/HeaderCell.tsx';
import { TextCell } from './cells/TextCell.tsx';
import { NumberCell } from './cells/NumberCell.tsx';
import { CurrencyCell } from './cells/CurrencyCell.tsx';
import { DateCell } from './cells/DateCell.tsx';
import { CountryCell } from './cells/CountryCell.tsx';

const columnHelper = createColumnHelper<Row>();

export const columns = [
  columnHelper.accessor('firstName', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'First name',
    },
    size: 120,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('lastName', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'Last name',
    },
    // size of 150 is used by default
    // size: 150,
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('randomDecimal', {
    enableColumnFilter: false,
    enablePinning: false,
    enableSorting: false,
    meta: {
      contentType: ContentTypes.Number,
      title: 'Random integer',
    },
    // We have to provide custom id here, otherwise it is inherited from accessor key value.
    // Which is used in multiple places
    id: 'randomInteger',
    // Set the custom filtering function for Number content type
    filterFn: 'isBiggerNumber',
    size: 144,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <NumberCell
        locale={props.table.options.meta?.locale}
        columnWidth={props.column.getSize()}
        value={props.getValue()}
      />
    ),
  }),
  columnHelper.accessor('randomDecimal', {
    meta: {
      contentType: ContentTypes.Number,
      title: 'Random decimal (3 digits)',
    },
    id: 'randomDecimal',
    filterFn: 'isBiggerNumber',
    size: 200,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <NumberCell
        locale={props.table.options.meta?.locale}
        columnWidth={props.column.getSize()}
        value={props.getValue()}
        fractionDigits={3}
      />
    ),
  }),
  columnHelper.accessor('randomDecimal', {
    meta: {
      contentType: ContentTypes.Number,
      title: 'Random currency (EUR)',
    },
    id: 'randomCurrency',
    filterFn: 'isBiggerNumber',
    size: 180,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <CurrencyCell
        locale={props.table.options.meta?.locale}
        columnWidth={props.column.getSize()}
        value={props.getValue()}
      />
    ),
  }),
  columnHelper.accessor('dateExample', {
    meta: {
      contentType: ContentTypes.Date,
      title: 'Random date',
    },
    size: 180,
    filterFn: 'isAfterDate',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <DateCell
        locale={props.table.options.meta?.locale}
        columnWidth={props.column.getSize()}
        value={props.getValue()}
      />
    ),
  }),
  columnHelper.accessor('email', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'Email',
    },
    size: 180,
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('address.country', {
    meta: {
      contentType: ContentTypes.Country,
      title: 'Country',
    },
    size: 120,
    sortingFn: 'countryCodesToNames',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <CountryCell
        locale={props.table.options.meta?.locale}
        columnWidth={props.column.getSize()}
        value={props.getValue()}
      />
    ),
  }),
  columnHelper.accessor('address.city', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'City',
    },
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('address.streetAddress', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'Address',
    },
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('business.companyName', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'Company',
    },
    size: 220,
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('business.iban', {
    meta: {
      contentType: ContentTypes.Text,
      title: 'IBAN',
    },
    size: 260,
    filterFn: 'includesString',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title={props.column.columnDef.meta?.title}
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
];
