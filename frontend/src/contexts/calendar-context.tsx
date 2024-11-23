import { useState, ReactNode } from "react";
import { CalendarContext } from "../hooks/calendar-hook";
import { addMonths, addWeeks, subMonths, subWeeks } from "date-fns";

export default function CalendarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dateValue, setDateValue] = useState(new Date());
  const [calendarView, setCalendarView] = useState<boolean>(true);
  function changeDate(date: Date) {
    setDateValue(date);
  }
  function changeView(value: boolean) {
    setCalendarView(value);
  }
  function changeMonths(direction: -1 | 1) {
    if (direction == 1) changeDate(addMonths(dateValue, 1));
    else changeDate(subMonths(dateValue, 1));
  }
  function changeWeek(direction: -1 | 1) {
    if (direction == 1) changeDate(addWeeks(dateValue, 1));
    else changeDate(subWeeks(dateValue, 1));
  }
  return (
    <CalendarContext.Provider
      value={{
        dateValue,
        changeDate,
        changeMonths,
        changeWeek,
        changeView,
        calendarView,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
