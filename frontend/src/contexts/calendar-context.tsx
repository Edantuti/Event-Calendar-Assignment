import { useState, ReactNode } from "react";
import { CalendarContext } from "../hooks/calendar-hook";
import { addMonths, subMonths } from "date-fns";

export default function CalendarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dateValue, setDateValue] = useState(new Date());
  function changeDate(date: Date) {
    setDateValue(date);
  }
  function changeMonths(direction: -1 | 1) {
    if (direction == 1) changeDate(addMonths(dateValue, 1));
    else changeDate(subMonths(dateValue, 1));
  }

  return (
    <CalendarContext.Provider value={{ dateValue, changeDate, changeMonths }}>
      {children}
    </CalendarContext.Provider>
  );
}
