import { useEffect, useState } from "react";
import { parseDate, formatDate } from "./DatePicker.utils";

type UseDatePickerProps = {
  value?: Date;
  onChange: (value?: Date) => void;
  dateFormat: string;
};

export const useDatePicker = ({
  value,
  dateFormat,
  onChange,
}: UseDatePickerProps) => {
  const [inputValue, setInputValue] = useState<string>(
    formatDate(value, dateFormat) ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setInputValue("");
      setError(null);
      return;
    }

    const formattedValue = formatDate(value, dateFormat);

    setInputValue(formattedValue as string);
    setError(null);
  }, [value, dateFormat]);

  const handleBlur = () => {
    if (inputValue === "") {
      setError(null);
      onChange?.(undefined);
      return;
    }

    const formattedDate = parseDate(inputValue, dateFormat);

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
    setInputValue,
  };
};
