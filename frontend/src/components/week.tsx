import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/events-hook";
import {
  addMonths,
  format,
  isSameMonth,
  isSameWeek,
  lastDayOfMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { HeaderWeek } from "./header-week";
import { Fragment } from "react/jsx-runtime";
import { DayWeek } from "./day-card";

export function WeekView({ currentDate }: { currentDate: Date }) {
  const { events, toggleEventModify } = useEvents();
  const [, setSearchParams] = useSearchParams();
  const firstDateMonth = startOfMonth(currentDate);
  const lastDateMonth = lastDayOfMonth(currentDate);
  const firstDate = startOfWeek(currentDate);
  const lastDate = lastDayOfWeek(currentDate);

  const days = [];
  const nextWeekDays = [];
  const previousWeekDays = [];
  if (
    isSameMonth(firstDate, currentDate) &&
    isSameMonth(lastDate, currentDate)
  ) {
    let day = firstDate.getDate();
    for (let i = 0; i < 7; i++) {
      days.push(
        <DayWeek
          empty={false}
          date={day++}
          month={firstDate.getMonth()}
          year={firstDate.getFullYear()}
          findEvents={findEvents}
        />,
      );
    }
  } else if (!isSameMonth(firstDate, currentDate)) {
    let day = firstDate.getDate();
    const month = firstDate.getMonth();
    const year = firstDate.getFullYear();
    const previousDays = lastDayOfMonth(new Date(year, month)).getDate() - day;
    for (let i = 0; i <= previousDays; i++) {
      previousWeekDays.push(
        <DayWeek
          date={day++}
          month={month}
          year={year}
          findEvents={findEvents}
        />,
      );
    }
    day = 1;
    for (let i = previousDays + 1; i < 7; i++) {
      days.push(
        <DayWeek
          empty={false}
          date={day++}
          month={lastDate.getMonth()}
          year={lastDate.getFullYear()}
          findEvents={findEvents}
        />,
      );
    }
  } else if (!isSameMonth(currentDate, lastDate)) {
    let day = firstDate.getDate();
    const month = lastDateMonth.getMonth();
    const year = lastDateMonth.getFullYear();
    const nextDays =
      lastDayOfMonth(
        new Date(firstDate.getFullYear(), firstDate.getMonth()),
      ).getDate() - firstDate.getDate();
    for (let i = 0; i <= nextDays; i++) {
      days.push(
        <DayWeek
          empty={false}
          date={day++}
          month={month}
          year={year}
          findEvents={findEvents}
        />,
      );
    }
    day = 1;
    for (let i = nextDays + 1; i < 7; i++) {
      nextWeekDays.push(
        <DayWeek
          date={day++}
          month={lastDate.getMonth()}
          year={lastDate.getFullYear()}
          findEvents={findEvents}
        />,
      );
    }
  }
  // if (
  //   isSameWeek(firstDate, firstDateMonth) &&
  //   isSameWeek(lastDate, firstDateMonth)
  // ) {
  //   const previousDayscount = firstDateMonth.getDay();
  //   let day = firstDate.getDate();
  //   for (let i = 0; i < previousDayscount; i++) {
  //     previousWeekDays.push(
  //       <DayWeek
  //         date={day++}
  //         month={firstDate.getMonth()}
  //         year={firstDate.getFullYear()}
  //         findEvents={findEvents}
  //       />,
  //     );
  //   }
  //   day = 1;

  //   // const temp = addMonths(currentDate, 1);
  //   const temp = currentDate;
  //   for (let i = previousDayscount; i < 7; i++) {
  //     days.push(
  //       <DayWeek
  //         date={day++}
  //         month={temp.getMonth()}
  //         year={temp.getFullYear()}
  //         findEvents={findEvents}
  //         empty={false}
  //       />,
  //     );
  //   }
  // } else if (
  //   isSameWeek(firstDate, currentDate) &&
  //   isSameWeek(lastDate, currentDate)
  // ) {
  //   const nextDaysCount = lastDate.getDay();
  //   console.log(lastDateMonth);
  //   let day = firstDate.getDate();
  //   for (let i = 0; i < nextDaysCount; i++) {
  //     days.push(
  //       <DayWeek
  //         date={day++}
  //         month={firstDate.getMonth()}
  //         year={firstDate.getFullYear()}
  //         findEvents={findEvents}
  //         empty={false}
  //       />,
  //     );
  //   }
  //   day = 1;
  //   const temp = addMonths(lastDateMonth, 1);
  //   for (let i = nextDaysCount; i < 7; i++) {
  //     nextWeekDays.push(
  //       <DayWeek
  //         date={day++}
  //         month={temp.getMonth()}
  //         year={temp.getFullYear()}
  //         findEvents={findEvents}
  //       />,
  //     );
  //   }
  // } else {
  //   let day = firstDate.getDate();
  //   for (let i = 0; i < 7; i++) {
  //     days.push(
  //       <DayWeek
  //         date={day++}
  //         month={firstDate.getMonth()}
  //         year={firstDate.getFullYear()}
  //         findEvents={findEvents}
  //         empty={false}
  //       />,
  //     );
  //   }
  // }
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
    <div className="bg-gray-50">
      <HeaderWeek />
      <div className="shadow-md overflow-hidden bg-white rounded m-2">
        <div className="grid grid-rows-7 h-screen">
          {previousWeekDays.map((value, i) => (
            <Fragment key={`empty-previous-${i}`}>{value}</Fragment>
          ))}
          {days.map((value, i) => (
            <Fragment key={`day-${i}`}>{value}</Fragment>
          ))}
          {nextWeekDays.map((value, i) => (
            <Fragment key={`empty-next-${i}`}>{value}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
