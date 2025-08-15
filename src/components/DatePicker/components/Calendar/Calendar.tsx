import useFocusTrap from "@pofo/focus-trap";
import {
  useRef,
  type ComponentProps,
  type KeyboardEvent,
  type RefObject,
} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.scss";

type CalendarProps = ComponentProps<typeof ReactDatePicker> & {
  onClose?: () => void;
};

export const Calendar = ({ onClose, ...props }: CalendarProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useFocusTrap(ref as RefObject<HTMLElement>, true, {
    initialFocus: "first",
  });

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== "Escape") return;

    onClose?.();
  };

  return (
    <div ref={ref} className={styles.calendarWrapper} onKeyDown={handleKeyDown}>
      <div className={styles.calendar}>
        <ReactDatePicker {...props} inline />
      </div>
    </div>
  );
};
