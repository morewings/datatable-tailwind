import { createColumnHelper } from '@tanstack/react-table';
import { Row } from './types.ts';
import { HeaderCell } from './cells/HeaderCell.tsx';
import { TextCell } from './cells/TextCell.tsx';
import { NumberCell } from './cells/NumberCell.tsx';
import { CurrencyCell } from './cells/CurrencyCell.tsx';
import { DateCell } from './cells/DateCell.tsx';
import { CountryCell } from './cells/CountryCell.tsx';

const columnHelper = createColumnHelper<Row>();

export const columns = [
  columnHelper.accessor('firstName', {
    size: 120,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="First name"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('lastName', {
    // size of 150 is used by default
    // size: 150,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Last name"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('randomDecimal', {
    // We have to provide custom id here, otherwise it is inherited from accessor key value.
    // Which is used in multiple places
    id: 'randomInteger',
    size: 144,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Random integer"
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
    id: 'randomDecimal',
    size: 200,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Random decimal (3 digits)"
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
    id: 'randomCurrency',
    size: 180,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Random currency (EUR)"
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
    size: 180,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Random date"
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
    size: 180,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Email"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('address.country', {
    size: 120,
    sortingFn: 'countryCodesToNames',
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Country"
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
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="City"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('address.streetAddress', {
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Address"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('business.companyName', {
    size: 220,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="Company"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
  columnHelper.accessor('business.iban', {
    size: 260,
    header: (props) => {
      return (
        <HeaderCell
          context={props}
          title="IBAN"
          columnWidth={props.column.getSize()}
        />
      );
    },
    cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
  }),
];
