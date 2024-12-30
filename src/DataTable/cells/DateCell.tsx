import { FC } from 'react';

export type Props = {
  /**
   * Date as an ISO string
   * @example
   * new Date().toISOString()
   */
  value?: string;
  /**
   * Set the width of a column in pixels
   * @example
   * { header: props => <Cell columnWidth={props.column.getSize()} /> }
   */
  columnWidth: number;
  /**
   * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
   * or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
   */
  locale?: string;
};

export const DateCell: FC<Props> = ({ value, columnWidth, locale }) => {
  /**
   * Intl.DateTimeFormat is a standard browser built-in object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   */
  const formattedValue =
    value !== undefined
      ? new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: 'short',
          weekday: 'short',
          day: 'numeric',
        }).format(new Date(value))
      : '';

  return (
    <div
      className="truncate p-1.5 text-right tabular-nums"
      title={formattedValue}
      style={{ width: columnWidth }}
    >
      {formattedValue}
    </div>
  );
};
