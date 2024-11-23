import { createContext, useContext } from "react";

export type Event = {
  id?: string;
  title: string;
  description: string;
  dateTime: Date;
  userId?: string;
  updatedAt?: Date;
  createdAt?: Date;
};

export interface EventsContextType {
  events: Event[];
  eventCreateModal: boolean;
  eventModifyModal: boolean;
  eventDisplayModal: boolean;
  toggleEventCreate: () => void;
  toggleEventModify: () => void;
  toggleEventDisplay: () => void;
  setEventsData: (data: Event[]) => void;
  addEvents: (data: Partial<Event>) => void;
  modifyEvents: (data: Partial<Event>) => void;
  removeEvents: (data: Partial<Event>) => void;
}

const defaultEvents: EventsContextType = {
  events: [],
  eventCreateModal: false,
  eventModifyModal: false,
  eventDisplayModal: false,
  setEventsData: () => {},
  toggleEventModify: () => {},
  toggleEventCreate: () => {},
  toggleEventDisplay: () => {},
  addEvents: () => {},
  modifyEvents: () => {},
  removeEvents: () => {},
};

export const EventsContext = createContext<EventsContextType>(defaultEvents);

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error(`useEvents could be declared inside the EventsProvider`);
  }
  return context;
}
