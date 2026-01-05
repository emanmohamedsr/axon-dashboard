import { useCalendarController } from "../hooks/useCalendarController";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const NativeCalendarView = () => {
	const {
		calendarRef,
		events,
		handleDateTitle,
		handleEventDrop,
		handleEventResize,
		handleDateSelect,
		handleEventClick,
	} = useCalendarController();

	return (
		<FullCalendar
			ref={calendarRef}
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			headerToolbar={false}
			initialView='dayGridMonth'
			datesSet={handleDateTitle}
			// -- Events
			events={events}
			editable={true}
			selectable={true}
			selectMirror={true}
			dayMaxEvents={1}
			eventDrop={handleEventDrop}
			eventResize={handleEventResize}
			select={handleDateSelect}
			eventClick={handleEventClick}
			// ----------
			aspectRatio={1.5}
			eventDisplay='block'
			height='auto'
			eventClassNames={(arg) => {
				const isDone = arg.event.extendedProps.done;
				return `border-transparent text-primary-foreground hover:opacity-90 cursor-pointer
								${isDone ? "opacity-50 line-through grayscale" : ""}
								`;
			}}
		/>
	);
};

export default NativeCalendarView;
