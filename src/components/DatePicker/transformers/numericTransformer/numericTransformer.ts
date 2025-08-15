import { dateFormatIsNumeric } from "../../utils";

export const numericTransformer = (dateFormat: string) => {
  if (!dateFormatIsNumeric(dateFormat)) return undefined;
  return (value: string) => value.replaceAll(/[^0-9./-]/g, "");
};
