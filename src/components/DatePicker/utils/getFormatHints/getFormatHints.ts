export type FormatHint = {
  type: "chars" | "separator";
  value: string;
  count?: number;
};

export const getFormatHints = (formatString: string): FormatHint[] => {
  const regex = /([a-zA-Z])\1*|([^a-zA-Z]+)/g;
  const matches = formatString.match(regex) || [];

  return matches.map((match) => {
    if (/[a-zA-Z]/.test(match)) {
      return {
        type: "chars" as const,
        value: match[0],
        count: match.length,
      };
    }
    return {
      type: "separator" as const,
      value: match,
    };
  });
};
