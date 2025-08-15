import { useState, type PropsWithChildren } from "react";
import { CalendarStateContext } from "./CalendarStateContext";

export const CalendarStateProvider = ({ children }: PropsWithChildren) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <CalendarStateContext.Provider value={{ openId, setOpenId }}>
      {children}
    </CalendarStateContext.Provider>
  );
};
