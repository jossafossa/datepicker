import { format } from "date-fns";
import { useEffect, useState } from "react";

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  dateFormat?: string;
};

const formatDate = (date: string, formatString: string) => {
  try {
    const formattedDate = format(date, formatString);
    return formattedDate;
  } catch {
    return undefined;
  }
};

export const DatePicker = ({
  value = "",
  onChange,
  dateFormat = "yyyy-MM-dd",
}: DatePickerProps) => {
  const [inputValue, setInputValue] = useState<string>(
    formatDate(value, dateFormat) ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formattedValue = formatDate(value, dateFormat);
    if (formattedValue) {
      setInputValue(formattedValue);
      setError(null);
    } else {
      setInputValue(value);
      setError("Invalid date format");
    }
  }, [value, dateFormat]);

  const handleBlur = () => {
    const formattedDate = formatDate(inputValue, dateFormat);
    if (!formattedDate) {
      setError("Invalid date format");
      return;
    }
    setError(null);
    setInputValue(formattedDate);
    onChange?.(formattedDate);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={handleBlur}
      />
      {error && <span>{error}</span>}
    </div>
  );
};
