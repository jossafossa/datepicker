import { useContext } from "react";
import { CalendarStateContext } from "../../components";

export const useCalendarState = () => {
  const context = useContext(CalendarStateContext);
  if (!context) {
    throw new Error(
      "useDatePickerOpen must be used within a CalendarOpenProvider"
    );
  }
  return context;
};
