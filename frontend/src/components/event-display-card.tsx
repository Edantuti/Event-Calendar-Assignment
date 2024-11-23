import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/events-hook";
import { Calendar, CircleX, Clock } from "lucide-react";
import { format } from "date-fns";

export function EventDisplayCard() {
  const { toggleEventDisplay, events } = useEvents();
  const [searchParams] = useSearchParams();
  const event = events.find(
    (value) => value.id === searchParams.get("eventId"),
  );
  function handleClick() {
    toggleEventDisplay();
  }
  return (
    <div className="absolute flex min-h-screen min-w-full bg-opacity-40 items-center justify-center bg-gray-50 top-0 left-0">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 border">
        <div className="p-8 space-y-2">
          <div className="flex justify-between">
            {" "}
            <h2 className="font-semibold text-xl">Event Details</h2>
            <button
              className="rounded-full p-1 border"
              onClick={() => handleClick()}
            >
              <CircleX className=" text-red-500" />
            </button>
          </div>
          <div>
            <h2 className="font-medium text-lg">Event Title</h2>
            <p className="text-sm text-gray-600">{event?.title}</p>
          </div>
          <div>
            <h2 className="font-medium text-lg">Event Description</h2>
            <p className="text-sm text-gray-600">{event?.description}</p>
          </div>
          <div>
            <h2 className="font-medium text-lg">Event Date</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {format(event!.dateTime, "EEEE, MMMM d, yyyy")}
            </div>
          </div>
          <div>
            <h2 className="font-medium text-lg">Event Time</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {format(event!.dateTime, "h:mm a")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
