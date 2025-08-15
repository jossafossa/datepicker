import styles from "./DatePicker.module.scss";
import { useDatePicker } from "./DatePicker.hooks";
import { Calendar, Error } from "./components";
import { useId, type InputHTMLAttributes } from "react";
import { classNames } from "./utils";
import { numericTransformer } from "./transformers";
import { useCalendarState } from "./hooks";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "value"
> & {
  value?: Date;
  onChange: (value?: Date) => void;
  dateFormat?: string;
  id?: string;
};

export const DatePicker = ({
  value,
  onChange,
  dateFormat = DEFAULT_DATE_FORMAT,
  className,
  id,
  ...inputProps
}: DatePickerProps) => {
  const generatedId = useId();
  const pickerId = id ?? generatedId;
  const { openId, setOpenId } = useCalendarState();
  const { inputValue, error, handleBlur, handleClear, setInputValue } =
    useDatePicker({
      value,
      onChange,
      dateFormat,
      inputTransformers: [numericTransformer(dateFormat)],
    });

  const showCalendar = openId === pickerId;

  const handleCalendarChange = (date: Date | null) => {
    onChange(date ?? undefined);
    setOpenId(null);
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
          onClick={() => setOpenId(showCalendar ? null : pickerId)}
        >
          ::
        </button>
      </div>
      {showCalendar && (
        <Calendar
          selected={value}
          onChange={handleCalendarChange}
          dateFormat={dateFormat}
          onClose={() => setOpenId(null)}
        />
      )}
      {error && <Error>{error}</Error>}
    </div>
  );
};
