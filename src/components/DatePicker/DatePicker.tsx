import styles from "./DatePicker.module.scss";
import { useDatePicker } from "./DatePicker.hooks";
import { Calendar, Error } from "./components";
import { useState, type InputHTMLAttributes } from "react";
import { classNames } from "./utils";
import { numericTransformer } from "./transformers";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "value"
> & {
  value?: Date;
  onChange: (value?: Date) => void;
  dateFormat?: string;
};

export const DatePicker = ({
  value,
  onChange,
  dateFormat = DEFAULT_DATE_FORMAT,
  className,
  onKeyDown,
  ...inputProps
}: DatePickerProps) => {
  const { inputValue, error, handleBlur, handleClear, setInputValue } =
    useDatePicker({
      value,
      onChange,
      dateFormat,
      inputTransformers: [numericTransformer(dateFormat)],
    });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarChange = (date: Date | null) => {
    onChange(date ?? undefined);
    setShowCalendar(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      console.log("cursor position:", event.currentTarget.selectionStart);
    }
  };

  return (
    <div className={styles.datePicker}>
      <div className={classNames(styles.inputWrapper, error && styles.error)}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={handleBlur}
          className={classNames(styles.input, className)}
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
        {inputValue && (
          <div className={styles.clearButtonWrapper}>
            <button
              className={classNames(styles.button, styles.clearButton)}
              onClick={handleClear}
            >
              x
            </button>
          </div>
        )}
        <button
          className={classNames(styles.button, styles.calendarButton)}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          ::
        </button>
      </div>
      {showCalendar && (
        <Calendar
          selected={value}
          onChange={handleCalendarChange}
          dateFormat={dateFormat}
          onClose={() => setShowCalendar(false)}
        />
      )}
      {error && <Error>{error}</Error>}
    </div>
  );
};
