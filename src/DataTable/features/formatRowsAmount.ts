export const formatRowsAmount = (amount: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(amount);