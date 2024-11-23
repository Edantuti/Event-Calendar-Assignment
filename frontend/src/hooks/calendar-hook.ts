import { createContext, useContext } from "react";

export interface CalendarContextType {
  dateValue: Date;
  calendarView: boolean;
  changeDate: (date: Date) => void;
  changeView: (value: boolean) => void;
  changeMonths: (direction: -1 | 1) => void;
  changeWeek: (direction: -1 | 1) => void;
}

const defaultCalendar: CalendarContextType = {
  dateValue: new Date(),
  calendarView: true,
  changeView: () => {},
  changeDate: () => {},
  changeMonths: () => {},
  changeWeek: () => {},
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
