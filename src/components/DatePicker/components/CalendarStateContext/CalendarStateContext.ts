import { createContext } from "react";

interface CalendarStateContextType {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const CalendarStateContext = createContext<
  CalendarStateContextType | undefined
>(undefined);
