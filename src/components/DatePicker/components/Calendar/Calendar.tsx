import useFocusTrap from "@pofo/focus-trap";
import {
  useRef,
  type ComponentProps,
  type KeyboardEvent,
  type RefObject,
} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div ref={ref} onKeyDown={handleKeyDown}>
      <ReactDatePicker {...props} inline />
    </div>
  );
};
