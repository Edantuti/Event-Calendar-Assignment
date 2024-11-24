import { getMonth, getWeekOfMonth, getYear } from "date-fns";
import { useCalendar } from "../hooks/calendar-hook";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KeyboardEvent } from "react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function HeaderWeek() {
  const { dateValue, changeWeek, changeView } = useCalendar();
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      changeWeek(-1);
    }
    if (event.key === "ArrowRight") {
      changeWeek(1);
    }
  }
  function handleClick(direction: -1 | 1) {
    changeWeek(direction);
  }
  return (
    <div className="h-20 flex justify-between items-center px-10 border-b bg-white">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <p>
          Week {getWeekOfMonth(dateValue)},{MONTHS[getMonth(dateValue)]},{" "}
          {getYear(dateValue)}
        </p>
        <button
          className="px-8 py-2 rounded-full"
          onClick={() => changeView(true)}
        >
          Change View
        </button>
      </div>
      <div className="flex gap-1" onKeyDown={(event) => handleKeyDown(event)}>
        <button onClick={() => handleClick(-1)} aria-label="previous week">
          <ChevronLeft className="p-2 rounded-full bg-gray-100 text-center size-10" />
        </button>
        <button onClick={() => handleClick(1)} aria-label="next week">
          <ChevronRight className="p-2 rounded-full bg-gray-100 text-center size-10" />
        </button>
      </div>
    </div>
  );
}
