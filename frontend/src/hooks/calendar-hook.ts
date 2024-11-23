import { createContext, useContext } from "react";

export interface CalendarContextType {
  dateValue: Date;
  changeDate: (date: Date) => void;
  changeMonths: (direction: -1 | 1) => void;
}

const defaultCalendar: CalendarContextType = {
  dateValue: new Date(),
  changeDate: () => {},
  changeMonths: () => {},
};

export const CalendarContext =
  createContext<CalendarContextType>(defaultCalendar);

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      `useCalendar could be declared inside the CalendarProvider`,
    );
  }
  return context;
}
