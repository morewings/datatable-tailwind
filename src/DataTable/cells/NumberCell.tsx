import { FC } from 'react';

export type Props = {
  /**
   * Provide the value to render in the cell
   */
  value?: number;
  /**
   * Provide the number of fraction digits to show.
   * The displayed number will be rounded or zeroes will be attached if needed.
   */
  fractionDigits?: number;
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

export const NumberCell: FC<Props> = ({
  value,
  fractionDigits = 0,
  columnWidth,
  locale,
}) => {
  /**
   * Intl.NumberFormat is a standard browser built-in object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   */
  const formattedValue =
    value !== undefined
      ? new Intl.NumberFormat(locale, {
          style: 'decimal',
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }).format(value)
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
