import { FC, useId } from 'react';
import classNames from 'classnames';

const createArray = (length: number) => {
  return new Array(length).fill('');
};

type Props = {
  rows: number;
  columns: number;
};

export const DataTable: FC<Props> = ({ rows, columns }) => {
  const id = useId();
  return (
    <div className="h-min max-h-screen max-w-full overflow-auto">
      <table
        id={id}
        className="border-separate border-spacing-0 text-xs"
      >
        <thead className="sticky left-0 top-0 z-20">
          <tr>
            {createArray(columns).map((_, headerCellIndex) => (
              <th
                key={`row-${id}-${headerCellIndex}`}
                className={classNames(
                  'whitespace-nowrap bg-stone-600 p-2 text-left font-normal text-gray-100',
                  'border-t border-solid border-t-stone-600 border-b border-b-stone-600 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                )}
              >
                Table column #{headerCellIndex + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {createArray(rows).map((_, rowIndex) => (
            <tr key={`row-${id}-${rowIndex}`}>
              {createArray(columns).map((_, cellIndex) => (
                <td
                  key={`row-${id}-${rowIndex}-${cellIndex}`}
                  className={classNames(
                    'whitespace-nowrap font-normal text-gray-700 p-2',
                    'border-b border-solid border-b-stone-300 border-r border-r-stone-300 first:border-l first:border-l-stone-300',
                  )}
                >
                  Table cell of column #{cellIndex + 1}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
