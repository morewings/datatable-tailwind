import { countryCodes } from './countryCodes.ts';

export const createCountryList = (locale = 'en-US') =>
  countryCodes
    .map((code) => ({
      value: code,
      // use a standard browser built-in object to get
      // a locale-aware country name from region code
      label: new Intl.DisplayNames(locale, { type: 'region' }).of(code) || '',
    }))
    .sort(({ label: leftLabel }, { label: rightLabel }) =>
      // use a standard browser built-in object to compare country names
      new Intl.Collator(locale).compare(leftLabel, rightLabel),
    );
