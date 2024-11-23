import { addMonths, getDay, getDaysInMonth, getMonth, getYear } from "date-fns";
import { lastDayOfMonth, subMonths } from "date-fns";
import { Fragment } from "react";
import { MiniDay } from "./day-card";

export function MiniCalendar({ currentDate }: { currentDate: Date }) {
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);
  const previousMonth = subMonths(currentDate, 1);
  const nextMonth = addMonths(currentDate, 1);
  const currentMonthYear = new Date(currentYear, currentMonth);
  const lastDay = lastDayOfMonth(currentMonthYear).getDay();
  const previousDate = lastDayOfMonth(
    new Date(currentYear, previousMonth.getMonth()),
  ).getDate();

  const firstDayOfMonth = getDay(currentMonthYear);
  const numberOfDays = getDaysInMonth(currentMonthYear);
  const emptyPreviousDays = [];
  const emptyNextDays = [];
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    emptyPreviousDays.push(
      <MiniDay
        date={previousDate - i}
        month={previousMonth.getMonth()}
        year={previousMonth.getFullYear()}
      />,
    );
  }
  emptyPreviousDays.reverse();
  for (let i = 1; i <= 6 - lastDay; i++) {
    emptyNextDays.push(
      <MiniDay
        date={i}
        month={nextMonth.getMonth()}
        year={nextMonth.getFullYear()}
      />,
    );
  }

  for (let i = 1; i <= numberOfDays; i++) {
    days.push(
      <MiniDay
        date={i}
        month={currentMonth}
        year={currentYear}
        empty={false}
      />,
    );
  }
  if (
    (lastDay >= 1 && lastDayOfMonth(currentMonthYear).getDate() === 30) ||
    (lastDay >= 0 && currentMonth === 1)
  ) {
    for (let i = 1; i <= 7; i++) {
      emptyNextDays.push(
        <MiniDay
          date={6 - lastDay + i}
          month={nextMonth.getMonth()}
          year={nextMonth.getFullYear()}
        />,
      );
    }
  } else if (lastDay > 1) {
    for (let i = 1; i <= 7; i++) {
      emptyNextDays.push(
        <MiniDay
          date={6 - lastDay + i}
          month={nextMonth.getMonth()}
          year={nextMonth.getFullYear()}
        />,
      );
    }
  }
  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {["s", "m", "t", "w", "th", "f", "sa"].map((value) => (
          <div key={value} className="p-1 text-center capitalize font-medium">
            {value}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 border rounded p-2">
        {emptyPreviousDays.map((value, i) => (
          <Fragment key={`empty-previous-${i}`}>{value}</Fragment>
        ))}
        {days.map((value, i) => (
          <Fragment key={`day-${i}`}>{value}</Fragment>
        ))}
        {emptyNextDays.map((value, i) => (
          <Fragment key={`empty-next-${i}`}>{value}</Fragment>
        ))}
      </div>
    </>
  );
}
