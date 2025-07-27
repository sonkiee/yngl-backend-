import { adjectives, animals } from "../constant";

const numberRangeMap: Record<string, [number, number]> = {
  "two-digit": [10, 99],
  "three-digit": [100, 999],
  short: [1, 9],
};

const separators = ["_"];

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (range: [number, number]): number =>
  Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];

const generateRandomAlias = (): string => {
  const adj = getRandomElement(adjectives);
  const animal = getRandomElement(animals);
  const separator = getRandomElement(separators);

  const willIncludeNumber = Math.random() < 0.5;

  if (!willIncludeNumber) return `${adj}${separator}${animal}`;

  // Random number range
  const rangeKeys = Object.keys(
    numberRangeMap
  ) as (keyof typeof numberRangeMap)[];
  const randomRangeKey = getRandomElement(rangeKeys);
  const range = numberRangeMap[randomRangeKey];
  const number = getRandomNumber(range);

  return `${adj}${separator}${animal}${number}`;
};
// for (let x = 0; x < 200; x++) {
//   console.log(generateRandomAlias());
// }

export { generateRandomAlias };
