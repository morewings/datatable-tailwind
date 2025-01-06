import { FC } from 'react';

export type Props = {
  /**
   * Provide a two-letter ISO 3166 region code
   * @see https://www.iso.org/iso-3166-country-codes.html
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

export const CountryCell: FC<Props> = ({ value, columnWidth, locale }) => {
  /**
   * Intl.NumberFormat is a standard browser built-in object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   */
  const formattedValue =
    value !== undefined
      ? new Intl.DisplayNames(locale, { type: 'region' }).of(value)
      : '';

  return (
    <div
      className="truncate p-1.5"
      title={formattedValue}
      style={{ width: columnWidth }}
    >
      {formattedValue}
    </div>
  );
};
