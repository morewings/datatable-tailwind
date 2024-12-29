import { FC } from 'react';
import classNames from 'classnames';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { columns } from './columnsConfig.tsx';
import { Row } from './types.ts';

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
  return (
    <div className="h-min max-h-screen max-w-full overflow-auto">
      <table className="border-separate border-spacing-0 text-xs">
        <thead className="sticky left-0 top-0 z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className={classNames(
                      // basic styles
                      'whitespace-nowrap bg-stone-600 text-left font-normal text-gray-100',
                      // border styles
                      'border-t border-solid border-t-stone-600 border-b border-b-stone-600 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                    )}
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    // basic styles
                    'whitespace-nowrap font-normal text-gray-700',
                    // border styles
                    'border-b border-solid border-b-stone-300 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
