import { FC, useRef, Fragment } from 'react';
import classNames from 'classnames';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { columns } from './columnsConfig.tsx';
import { Row } from './types.ts';
import { useVirtualRows } from './features/useVirtualRows.ts';
import { createPinnedCellStyle } from './features/createPinnedCellStyle.ts';

type Props = {
  /**
   * Provide a data to render
   */
  tableData: Row[];
};

export const DataTable: FC<Props> = ({ tableData }) => {
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
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
                          'whitespace-nowrap font-normal text-stone-950 bg-white p-0',
                          // border styles
                          'border-b border-solid border-b-stone-300 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                          // sticky column styles
                          {
                            'sticky z-20': Boolean(cell.column.getIsPinned()),
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
