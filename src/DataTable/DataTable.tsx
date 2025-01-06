import { FC, useRef, Fragment } from 'react';
import classNames from 'classnames';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { columns } from './columnsConfig.tsx';
import { Row } from './types.ts';
import { useVirtualRows } from './features/useVirtualRows.ts';
import { createPinnedCellStyle } from './features/createPinnedCellStyle.ts';
import { useSortingFns } from './features/useSortingFns.ts';

type Props = {
  /**
   * Provide a data to render
   */
  tableData: Row[];
  /**
   * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
   * or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
   */
  locale?: string;
};

export const DataTable: FC<Props> = ({ tableData, locale = 'en-US' }) => {
  // create a custom sorting function
  const { countryCodesToNames } = useSortingFns(locale);

  const table = useReactTable({
    meta: {
      // record locale to the table meta
      locale,
    },
    sortingFns: {
      // set the custom sorting function we created for the table
      countryCodesToNames,
    },
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    // apply Sorted Row Model from TanStack
    getSortedRowModel: getSortedRowModel(),
  });

  /* Virtualizer logic start */
  const scrollRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  const { before, after, virtualRows } = useVirtualRows({
    scrollRef,
    rowsCount: rows.length,
  });
  /* Virtualizer logic end */

  return (
    <div
      className="h-min max-h-screen max-w-full overflow-auto"
      ref={scrollRef}
    >
      <table className="border-separate border-spacing-0 text-xs">
        <thead className="sticky left-0 top-0 z-30">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index, headerCells) => {
                const cellStyle = createPinnedCellStyle({
                  index,
                  rowLength: headerCells.length,
                  context: header,
                });
                return (
                  <th
                    key={header.id}
                    className={classNames(
                      // basic styles
                      'whitespace-nowrap text-left font-normal text-stone-100 p-0',
                      // border styles
                      'border-t border-solid border-t-stone-600 border-b border-b-stone-600 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                      // sticky column styles
                      {
                        'sticky z-20 bg-cyan-800 border-t-cyan-800 border-b-cyan-800':
                          Boolean(header.column.getIsPinned()),
                        'bg-stone-600': !header.column.getIsPinned(),
                      },
                    )}
                    style={cellStyle}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          <Fragment>
            {/* Fix the issue with a sticky table header and infinite scroll */}
            {before > 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: before }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              // this is the "real" current row
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index, rowCells) => {
                    const cellStyle = createPinnedCellStyle({
                      index,
                      rowLength: rowCells.length,
                      context: cell,
                    });
                    return (
                      <td
                        key={cell.id}
                        className={classNames(
                          // basic styles
                          'whitespace-nowrap font-normal text-stone-950 p-0',
                          // border styles
                          'border-b border-solid border-b-stone-300 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                          // sticky column styles
                          {
                            'sticky z-20': Boolean(cell.column.getIsPinned()),
                          },
                          // add cyan highlight for the column is in a sorted state
                          {
                            'bg-white': !cell.column.getIsSorted(),
                            'bg-cyan-100': Boolean(cell.column.getIsSorted()),
                          },
                        )}
                        style={cellStyle}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {after > 0 && (
              <tr>
                <td colSpan={columns.length} style={{ height: after }} />
              </tr>
            )}
          </Fragment>
        </tbody>
      </table>
    </div>
  );
};
