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

// here is explanation https://dev.to/morewings/how-to-use-typescript-enums-to-store-union-types-and-access-them-during-runtime-9ni
export enum ContentTypes {
  Text = 'Text',
  Number = 'Number',
  Date = 'Date',
  Country = 'Country',
}
