export type Row = {
  firstName: string;
  lastName: string;
  randomDecimal: number;
  dateExample: string;
  email: string;
  address: {
    country: string;
    city: string;
    streetAddress: string;
  }
  business: {
    companyName: string;
    iban: string;
  }
};
