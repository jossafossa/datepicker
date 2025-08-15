const NON_NUMERIC_TOKENS = [
  "MMM",
  "MMMM",
  "EEE",
  "EEEE",
  "a",
  "aaa",
  "aaaa",
  "do",
  "LLLL",
  "LLL",
  "ccc",
  "cccc",
  "G",
  "GG",
  "GGG",
  "GGGG",
];

export const dateFormatIsNumeric = (format: string) =>
  !NON_NUMERIC_TOKENS.some((token) => format.includes(token));
