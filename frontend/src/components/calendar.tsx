import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  lastDayOfMonth,
  subMonths,
} from "date-fns";
import { Fragment } from "react";
import { Header } from "./header";
import { useEvents } from "../hooks/events-hook";
import { useSearchParams } from "react-router-dom";
import { Day } from "./day-card";

export function CalendarView({ currentDate }: { currentDate: Date }) {
  const { events, toggleEventModify } = useEvents();
  const [, setSearchParams] = useSearchParams();
  const currentMonth: number = getMonth(currentDate);
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
      <Day
        date={previousDate - i}
        month={previousMonth.getMonth()}
        year={previousMonth.getFullYear()}
        findEvents={findEvents}
      />,
    );
  }
  emptyPreviousDays.reverse();
  for (let i = 1; i <= 6 - lastDay; i++) {
    emptyNextDays.push(
      <Day
        date={i}
        month={nextMonth.getMonth()}
        year={nextMonth.getFullYear()}
        findEvents={findEvents}
      />,
    );
  }

  for (let i = 1; i <= numberOfDays; i++) {
    days.push(
      <Day
        empty={false}
        date={i}
        month={currentMonth}
        year={currentYear}
        findEvents={findEvents}
      />,
    );
  }
  if (
    (lastDay >= 1 && lastDayOfMonth(currentMonthYear).getDate() === 30) ||
    (lastDay >= 0 && currentMonth === 1)
  ) {
    for (let i = 1; i <= 7; i++) {
      emptyNextDays.push(
        <Day
          date={6 - lastDay + i}
          month={nextMonth.getMonth()}
          year={nextMonth.getFullYear()}
          findEvents={findEvents}
        />,
      );
    }
  } else if (lastDay > 1) {
    for (let i = 1; i <= 7; i++) {
      emptyNextDays.push(
        <Day
          date={6 - lastDay + i}
          month={nextMonth.getMonth()}
          year={nextMonth.getFullYear()}
          findEvents={findEvents}
        />,
      );
    }
  }
  function findEvents(date: number, month: number, year: number) {
    const dateValue = new Date(year, month, date);
    const currentEvents = events.filter(
      (value) => value.dateTime.toDateString() === dateValue.toDateString(),
    );
    if (!currentEvents) return undefined;
    return (
      <>
        {currentEvents.slice(0, 2).map((value) => (
          <div
            key={value.id!}
            className="bg-blue-400 rounded px-2 py-1 flex justify-between"
            onClick={() => {
              setSearchParams({ eventId: value.id! });
              toggleEventModify();
            }}
          >
            <h2 className="line-clamp-1">{value.title}</h2>
            <span>{format(value.dateTime, "h:mm a")}</span>
          </div>
        ))}
        {currentEvents.length > 2 && <p>few more...</p>}
      </>
    );
  }
  return (
    <div className=" bg-gray-50">
      <Header />
      <div className="bg-white m-2 rounded shadow-md overflow-hidden">
        <div className="grid grid-cols-7 gap-1 grid-flow-dense my-1">
          {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((value) => (
            <div
              key={value}
              className="p-2 capitalize font-semibold text-lg text-center"
            >
              {value}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 min-h-screen grid-rows-6 grid-flow-dense">
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
      </div>
    </div>
  );
}
