import {
  uniqueNamesGenerator,
  names,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import { getRandomFloatingRange } from './getRandomNumber.ts';
import { getRandomDate } from './getRandomDate.ts';
import { email, city, iban, phoneNumber, streetAddress } from './mocks.ts';
import { Row } from '../DataTable/types.ts';
import { countryCodes } from './countryCodes.ts';

const createArray = (length: number) => {
  return new Array(length).fill('');
};

/**
 * Utility function. Poor man's faker.
 */
export const generateData = (rowsAmount: number, seed?: number): Row[] => {
  return createArray(rowsAmount).map((_, i) => {
    const hasSeed = seed !== undefined;
    return {
      firstName: uniqueNamesGenerator({
        dictionaries: [names],
        ...(hasSeed && { seed: seed + i }),
        style: 'capital',
      }),
      lastName: uniqueNamesGenerator({
        dictionaries: [names],
        // an extra number is added to make difference from first name
        ...(hasSeed && { seed: seed + i + 66 }),
        style: 'capital',
      }),
      randomDecimal: getRandomFloatingRange({
        min: -10000000,
        max: 10000000,
        ...(hasSeed && { seed: seed + i }),
      }),
      dateExample: getRandomDate({
        start: new Date(1982, 5, 6),
        end: new Date(2024, 5, 6),
        ...(hasSeed && { seed: seed + i }),
      }).toISOString(),
      email: uniqueNamesGenerator({
        dictionaries: [email],
        ...(hasSeed && { seed: seed + i }),
        style: 'capital',
      }),
      address: {
        city: uniqueNamesGenerator({
          dictionaries: [city],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
        }),
        country: uniqueNamesGenerator({
          dictionaries: [countryCodes],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
        }),
        streetAddress: uniqueNamesGenerator({
          dictionaries: [streetAddress],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
        }),
        phoneNumber: uniqueNamesGenerator({
          dictionaries: [phoneNumber],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
        }),
      },
      business: {
        iban: uniqueNamesGenerator({
          dictionaries: [iban],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
        }),
        companyName: uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          ...(hasSeed && { seed: seed + i }),
          style: 'capital',
          separator: ' ',
        }),
      },
    } as Row;
  });
};
