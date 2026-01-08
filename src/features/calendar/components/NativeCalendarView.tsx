import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
	type EventResizeDoneArg,
} from "@fullcalendar/interaction";
import type { CalendarEvent } from "../types";
import type {
	DateSelectArg,
	DatesSetArg,
	EventClickArg,
	EventDropArg,
} from "@fullcalendar/core/index.js";
import useCalendarEvents from "../hooks/useCalendarEvents";

interface NativeCalendarViewProps {
	events?: CalendarEvent[];
	calendarRef?: React.RefObject<FullCalendar | null>;
	handleDateTitle?: (arg: DatesSetArg) => void;
	handleEventDrop?: (arg: EventDropArg) => void;
	handleEventResize?: (arg: EventResizeDoneArg) => void;
	handleDateSelect?: (arg: DateSelectArg) => void;
	handleEventClick?: (arg: EventClickArg) => void;
	isWidgetMode?: boolean;
}

const NativeCalendarView = ({
	events = useCalendarEvents((state) => state.events),
	calendarRef,
	handleDateTitle = () => {},
	handleEventDrop = () => {},
	handleEventResize = () => {},
	handleDateSelect = () => {},
	handleEventClick = () => {},
	isWidgetMode = false,
}: NativeCalendarViewProps) => {
	return (
		<FullCalendar
			ref={calendarRef}
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			headerToolbar={false}
			initialView={"dayGridMonth"}
			events={events}
			editable={!isWidgetMode}
			selectable={!isWidgetMode}
			datesSet={handleDateTitle}
			eventDrop={handleEventDrop}
			eventResize={handleEventResize}
			select={handleDateSelect}
			eventClick={handleEventClick}
			height={isWidgetMode ? "450px" : "auto"}
			selectMirror={!isWidgetMode}
			dayMaxEvents={1}
			aspectRatio={1.5}
			eventDisplay='block'
			eventClassNames={(arg) => {
				const isDone = arg.event.extendedProps.status === "done";
				const inProgress = arg.event.extendedProps.status === "inprogress";
				return `border-transparent text-primary-foreground hover:opacity-90 cursor-pointer
								${
									isDone
										? "opacity-50 line-through grayscale"
										: inProgress
										? "contrast-200"
										: ""
								}
								`;
			}}
		/>
	);
};

export default NativeCalendarView;
