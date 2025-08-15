import { useEffect, useState } from "react";
import { parseDate, formatDate } from "./DatePicker.utils";

type Formatter = (date: string) => string;
type FormatterList = Array<Formatter | undefined | false>;

type UseDatePickerProps = {
  value?: Date;
  onChange: (value?: Date) => void;
  dateFormat: string;
  changeTransformers?: FormatterList;
  inputTransformers?: FormatterList;
};

const applyFormatters = (value: string, formatters: FormatterList) => {
  return formatters.reduce(
    (acc, formatter) => (formatter ? formatter(acc) : acc),
    value
  );
};

export const useDatePicker = ({
  value,
  dateFormat,
  onChange,
  changeTransformers = [],
  inputTransformers = [],
}: UseDatePickerProps) => {
  const [inputValue, setInputValue] = useState<string>(
    formatDate(value, dateFormat) ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  const setInputFormattedValue = (value: string) => {
    const formattedValue = applyFormatters(value, inputTransformers);
    setInputValue(formattedValue);
  };

  useEffect(() => {
    if (!value) {
      setInputValue("");
      setError(null);
      return;
    }

    const formattedValue = formatDate(value, dateFormat);

    setInputValue(formattedValue as string);
    setError(null);
  }, [value, dateFormat, setInputValue]);

  const handleBlur = () => {
    if (inputValue === "") {
      setError(null);
      onChange?.(undefined);
      return;
    }

    const formattedInput = applyFormatters(inputValue, changeTransformers);
    const formattedDate = parseDate(formattedInput, dateFormat);

    if (!formattedDate) {
      setError("Invalid date format");
      return;
    }

    setError(null);
    setInputValue(formatDate(formattedDate, dateFormat) ?? "");

    onChange?.(formattedDate);
  };

  const handleClear = () => {
    setInputValue("");
    setError(null);
    onChange?.(undefined);
  };

  return {
    inputValue,
    error,
    handleBlur,
    handleClear,
    setInputValue: setInputFormattedValue,
  };
};
