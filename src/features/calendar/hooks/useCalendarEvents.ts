import { create } from "zustand";
import type { CalendarEvent } from "../types";
import events from "../data/eventsMockData";
export interface EventsState {
	events: CalendarEvent[];
	resizeEvent: (id: string, newEnd: string | Date) => void;
	dropEvent: (
		id: string,
		newStart: string | Date,
		newEnd: string | Date,
	) => void;
	addEvent: (event: CalendarEvent) => void;
	updateEvent: (id: string, event: CalendarEvent) => void;
	deleteEvent: (id: string) => void;
	toggleDone: (id: string) => void;
}

const useCalendarEvents = create<EventsState>((set) => ({
	events,
	resizeEvent: (id, newEnd) =>
		set((state) => ({
			events: state.events.map((event) =>
				event.id === id ? { ...event, end: newEnd } : event,
			),
		})),
	dropEvent: (id, newStart, newEnd) =>
		set((state) => ({
			events: state.events.map((event) =>
				event.id === id ? { ...event, start: newStart, end: newEnd } : event,
			),
		})),
	addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
	updateEvent: (id, event) =>
		set((state) => ({
			events: state.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
		})),
	deleteEvent: (id) =>
		set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
	toggleDone: (id) =>
		set((state) => ({
			events: state.events.map((event) =>
				event.id === id ?
					{ ...event, status: event.status === "done" ? "pending" : "done" }
				:	event,
			),
		})),
}));

export default useCalendarEvents;
