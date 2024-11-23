import { getDay } from "date-fns";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DayWeek({
  date,
  month,
  year,
  findEvents,
  empty = true,
}: {
  date: number;
  month: number;
  year: number;
  empty?: boolean;
  findEvents: (
    date: number,
    month: number,
    year: number,
  ) => JSX.Element | undefined;
}) {
  if (
    date === new Date().getDate() &&
    month === new Date().getMonth() &&
    year === new Date().getFullYear()
  )
    return (
      <div className="border bg-blue-200 p-2 flex flex-col gap-2">
        <p>
          {date},{WEEK[getDay(new Date(year, month, date))]}
        </p>
        {findEvents(date, month, year)}
      </div>
    );
  return (
    <div
      className={
        empty
          ? "text-gray-500 border p-2 flex flex-col gap-2"
          : "border p-2 flex flex-col gap-2"
      }
    >
      <p>
        {date},{WEEK[getDay(new Date(year, month, date))]}
      </p>
      {findEvents(date, month, year)}
    </div>
  );
}
export function Day({
  date,
  month,
  year,
  findEvents,
  empty = true,
}: {
  date: number;
  month: number;
  year: number;
  empty?: boolean;
  findEvents: (
    date: number,
    month: number,
    year: number,
  ) => JSX.Element | undefined;
}) {
  if (
    date === new Date().getDate() &&
    month === new Date().getMonth() &&
    year === new Date().getFullYear()
  )
    return (
      <div className="border bg-blue-200 p-2 flex flex-col gap-2">
        <p>{date}</p>
        {findEvents(date, month, year)}
      </div>
    );
  return (
    <div
      className={
        empty
          ? "text-gray-500 border p-2 flex flex-col gap-2"
          : "border p-2 flex flex-col gap-2"
      }
    >
      <p>{date}</p>
      {findEvents(date, month, year)}
    </div>
  );
}
export function MiniDay({
  date,
  month,
  year,
  empty = true,
}: {
  date: number;
  month: number;
  year: number;
  empty?: boolean;
}) {
  if (
    date === new Date().getDate() &&
    month === new Date().getMonth() &&
    year === new Date().getFullYear()
  )
    return <div className="text-center rounded border bg-blue-400">{date}</div>;
  return (
    <div className={empty ? "text-gray-300 text-center" : "text-center"}>
      {date}
    </div>
  );
}
