import { FC } from 'react';

export type Props = {
  value?: number;
  /**
   * Provide ISO 4217 currency code
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency_2
   */
  currency?: string;
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

export const CurrencyCell: FC<Props> = ({
  value,
  currency = 'EUR',
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
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency,
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
