import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/events-hook";
import {
  Calendar,
  CircleArrowOutUpRight,
  Clock,
  SquarePen,
} from "lucide-react";
import { format } from "date-fns";

export function EventTag({ id }: { id: string; title?: string }) {
  const { events, toggleEventDisplay, toggleEventModify } = useEvents();
  const [, setSearchParams] = useSearchParams();
  const event = events.find((value) => value.id === id);
  function handleClick() {
    setSearchParams({ eventId: id });
    toggleEventDisplay();
  }
  function handleEditClick() {
    setSearchParams({ eventId: id });
    toggleEventModify();
  }
  return (
    <li className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-start justify-between">
        <h4 className="text-lg font-semibold text-gray-900">{event!.title}</h4>
        <div className="flex">
          <button
            onClick={() => handleEditClick()}
            className="px-4 py-2 text-blue-500 rounded"
            title="Edit Event"
          >
            <SquarePen className="size-4" />
          </button>
          <button
            onClick={() => handleClick()}
            className="px-4 py-2 text-blue-500 rounded"
            title="View Event"
          >
            <CircleArrowOutUpRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {format(event!.dateTime, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {format(event!.dateTime, "h:mm a")}
        </div>
      </div>
    </li>
  );
}
