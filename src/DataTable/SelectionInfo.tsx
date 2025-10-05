import { FC } from 'react';
import { formatRowsAmount } from './features/formatRowsAmount.ts';

export type Props = {
  /**
   * Total number of rows
   */
  total: number;
  /**
   * Number of selected rows
   */
  selected: number;
  /**
   * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
   * or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
   */
  locale: string;
};

export const SelectionInfo: FC<Props> = ({ total, selected, locale }) => {
  return (
    <div className="text-sm tabular-nums text-primary dark:text-textDark">
      <strong>{formatRowsAmount(selected, locale)}</strong> of{' '}
      <strong>{formatRowsAmount(total, locale)}</strong> rows selected
    </div>
  );
};
