import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { TableDialog } from './TableDialog.tsx';
import { TextField } from '../inputs/TextField.tsx';
import { NumericField } from '../inputs/NumericField.tsx';
import { DateField } from '../inputs/DateField.tsx';
import { ComboField } from '../inputs/ComboField.tsx';
import { ReadOnlyField } from '../inputs/ReadOnlyField.tsx';
import { ContentTypes, Row } from '../types.ts';
import { Button } from './../inputs/Button.tsx';
import { useFilterableColumns } from '../features/useFilterableColumns.ts';
import { createCountryList } from '../../mocks/createCountryList.ts';

export type Props = {
  selectedColumn?: string;
  isOpen: boolean;
  onClose?: () => void;
  tableContext: Table<Row>;
};

export const FilterDialog: FC<Props> = ({
  isOpen,
  selectedColumn: selectedColumnProp,
  onClose = () => {},
  tableContext,
}) => {
  // get all filterable columns
  const columns = useFilterableColumns(tableContext);

  // find the currently selected column among all
  const selectedColumn = useMemo(
    () => columns.find(({ id }) => id === selectedColumnProp),
    [columns, selectedColumnProp],
  );

  // get selected column filter value using TanStack API
  const filterValue =
    selectedColumnProp &&
    (tableContext.getColumn(selectedColumnProp)?.getFilterValue() as
      | string
      | undefined);

  // state containing filter value provided by the user
  const [nextFilterValue, setNextFilterValue] = useState<string>('');

  // effect needed to sync filter value and column selection
  useEffect(() => {
    setNextFilterValue(filterValue || '');
  }, [
    filterValue,
    // This dependency ensures that the state is cleared after Dialog dismissed
    selectedColumn,
  ]);

  const handleReset = useCallback(() => {
    tableContext.getColumn(selectedColumnProp as string)?.setFilterValue('');
    onClose();
  }, [onClose, selectedColumnProp, tableContext]);

  const handleSetFilter = useCallback(() => {
    tableContext
      .getColumn(selectedColumnProp as string)
      ?.setFilterValue(nextFilterValue);
    onClose();
  }, [nextFilterValue, onClose, selectedColumnProp, tableContext]);

  const filterInput = useMemo(() => {
    const countryOptions = createCountryList(tableContext.options.meta?.locale);
    return selectedColumn
      ? {
          [ContentTypes.Text]: (
            <TextField
              label="Cell contains:"
              placeholder="Enter text (case insensitive)"
              onChange={setNextFilterValue}
              value={nextFilterValue as string}
            />
          ),
          [ContentTypes.Number]: (
            <NumericField
              label="Number is bigger than:"
              placeholder="-123.456"
              onChange={setNextFilterValue}
              value={nextFilterValue as string}
            />
          ),
          [ContentTypes.Date]: (
            <DateField
              label="Filter dates after:"
              placeholder="Pick date"
              onChange={setNextFilterValue}
              value={nextFilterValue as string}
            />
          ),
          [ContentTypes.Country]: (
            <ComboField
              value={nextFilterValue as string}
              icon="globe-stand"
              options={countryOptions}
              label="Select country"
              placeholder="Start typing or expand"
              onChange={setNextFilterValue}
            />
          ),
        }[selectedColumn.contentType]
      : null;
  }, [nextFilterValue, selectedColumn, tableContext.options.meta?.locale]);

  return (
    <TableDialog title={`Filter column`} open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <ReadOnlyField label="Selected column:" value={selectedColumn?.title} />
        {filterInput}
      </div>
      <div className="mt-8 flex justify-evenly gap-3">
        <Button
          className="min-w-32"
          onClick={handleReset}
          title="Reset"
          icon="funnel-x"
        />
        <Button
          disabled={!nextFilterValue}
          className="min-w-32"
          onClick={handleSetFilter}
          title="Apply"
          icon="funnel"
        />
      </div>
    </TableDialog>
  );
};
