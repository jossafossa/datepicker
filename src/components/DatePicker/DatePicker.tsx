import styles from "./DatePicker.module.scss";
import { useDatePicker } from "./DatePicker.hooks";
import { Calendar } from "./components";
import { useState } from "react";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

type DatePickerProps = {
  value?: Date;
  onChange: (value?: Date) => void;
  dateFormat?: string;
};

export const DatePicker = ({
  value,
  onChange,
  dateFormat = DEFAULT_DATE_FORMAT,
}: DatePickerProps) => {
  const { inputValue, error, handleBlur, handleClear, setInputValue } =
    useDatePicker({ value, onChange, dateFormat });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarChange = (date: Date | null) => {
    onChange(date ?? undefined);
    setShowCalendar(false);
  };

  return (
    <div className={styles.datePicker}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={handleBlur}
          className={styles.input}
        />
        {inputValue && (
          <div className={styles.clearButtonWrapper}>
            <button
              className={`${styles.button} ${styles.clearButton}`}
              onClick={handleClear}
            >
              x
            </button>
          </div>
        )}
        <button
          className={`${styles.button} ${styles.calendarButton}`}
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
      {error && <span>{error}</span>}
    </div>
  );
};
