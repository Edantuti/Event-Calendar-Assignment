import { ReactNode, useState } from "react";
import { Event, EventsContext } from "../hooks/events-hook";

export default function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventCreateModal, setEventCreateModal] = useState<boolean>(false);
  const [eventModifyModal, setEventModifyModal] = useState<boolean>(false);
  const [eventDisplayModal, setEventDisplayModal] = useState<boolean>(false);

  function toggleEventCreate() {
    setEventCreateModal(!eventCreateModal);
  }
  function toggleEventModify() {
    setEventModifyModal(!eventModifyModal);
  }
  function toggleEventDisplay() {
    setEventDisplayModal(!eventDisplayModal);
  }
  function addEvents(data: Partial<Event>) {
    if (!data.title || !data.description || !data.dateTime) {
      throw new Error(`Incomplete Info`);
      return;
    }
    setEvents([
      ...events,
      {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        dateTime: data.dateTime,
      },
    ]);
  }
  function modifyEvents(data: Partial<Event>) {
    if (!data.id) {
      throw new Error(`Incomplete Info`);
      return;
    }
    const newEvents = events;
    const eventId = events.findIndex((value) => value.id === data.id);
    newEvents[eventId] = {
      id: data.id,
      title: data.title ?? newEvents[eventId].title,
      description: data.description ?? newEvents[eventId].description,
      dateTime: data.dateTime ?? newEvents[eventId].dateTime,
    };
    setEvents([...newEvents]);
  }
  function removeEvents(data: Partial<Event>) {
    if (!data.id) {
      throw new Error(`Incomplete Info`);
      return;
    }
    const newEvents = events.filter((value) => value.id !== data.id);
    setEvents([...newEvents]);
  }
  function setEventsData(data: Event[]) {
    const newEvents: Event[] = [];
    for (let i = 0; i < data.length; i++) {
      newEvents.push({ ...data[i], dateTime: new Date(data[i].dateTime) });
    }
    setEvents([...newEvents]);
  }
  return (
    <EventsContext.Provider
      value={{
        events,
        addEvents,
        modifyEvents,
        removeEvents,
        eventDisplayModal,
        eventCreateModal,
        eventModifyModal,
        toggleEventCreate,
        toggleEventModify,
        toggleEventDisplay,
        setEventsData,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
