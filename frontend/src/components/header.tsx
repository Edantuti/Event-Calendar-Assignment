import { getMonth, getYear } from "date-fns";
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

export function Header() {
  const { dateValue, changeMonths } = useCalendar();
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      changeMonths(-1);
    }
    if (event.key === "ArrowRight") {
      changeMonths(1);
    }
  }
  function handleClick(direction: -1 | 1) {
    changeMonths(direction);
  }
  return (
    <div className="h-20 flex justify-between items-center px-10 border-b bg-white">
      <div className="text-xl font-semibold">
        {MONTHS[getMonth(dateValue)]}, {getYear(dateValue)}
      </div>
      <div className="flex gap-1" onKeyDown={(event) => handleKeyDown(event)}>
        <button onClick={() => handleClick(-1)}>
          <ChevronLeft className="p-2 rounded-full bg-gray-100 text-center size-10" />
        </button>
        <button onClick={() => handleClick(1)}>
          <ChevronRight className="p-2 rounded-full bg-gray-100 text-center size-10" />
        </button>
      </div>
    </div>
  );
}
