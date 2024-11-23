import { useSearchParams } from "react-router-dom";
import { useCalendar } from "../hooks/calendar-hook";
import { useEffect } from "react";
import { MiniCalendar } from "../components/mini-calendar";
import { getMonth, getYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../hooks/events-hook";
import { EventTag } from "./event-tag";
import { UserDetail } from "./user-detail";

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
export function NavBar() {
  const { dateValue, changeMonths } = useCalendar();
  const [, setSearchParams] = useSearchParams();
  const { events, toggleEventCreate } = useEvents();
  useEffect(() => {
    const timerid = setTimeout(
      () =>
        setSearchParams({
          month: MONTHS[dateValue.getMonth()],
          year: dateValue.getFullYear().toString(),
        }),
      3000,
    );
    return () => clearInterval(timerid);
  }, [dateValue]);
  function handleClick(direction: -1 | 1) {
    changeMonths(direction);
  }
  return (
    <div className="flex flex-col flex-1 max-w-96 px-10 py-4 space-y-6 border-r">
      <UserDetail />
      <button
        className="py-2 px-4 bg-blue-500 rounded"
        onClick={() => {
          toggleEventCreate();
        }}
      >
        Create Event
      </button>
      <div className="flex justify-between items-center">
        <div className="font-medium">
          {MONTHS[getMonth(dateValue)]}, {getYear(dateValue)}
        </div>
        <div className="flex gap-1 items-center">
          <button onClick={() => handleClick(-1)}>
            <ChevronLeft className="p-2 rounded-full bg-gray-100 text-center size-8" />
          </button>
          <button onClick={() => handleClick(1)}>
            <ChevronRight className="p-2 rounded-full bg-gray-100 text-center size-8" />
          </button>
        </div>
      </div>
      <MiniCalendar currentDate={dateValue} />
      <div className="">
        <h3 className="font-semibold text-xl">Events</h3>
        <ul className="overflow-y-scroll h-96 space-y-2">
          {events.map((value) => (
            <EventTag id={value.id!} title={value.title} key={value.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
