import type { CalendarEvent } from "../types";

export function getEventsHistogramAnalytics(events: CalendarEvent[]) {
	const DURATIONS = {
		ZeroToOne: "0-1",
		OneToTwo: "1-2",
		TwoToFour: "2-4",
		moreThanFour: "4+",
		SpanAllDay: "AD",
	};
	const histogram: Record<string, number> = {
		[DURATIONS.ZeroToOne]: 0,
		[DURATIONS.OneToTwo]: 0,
		[DURATIONS.TwoToFour]: 0,
		[DURATIONS.moreThanFour]: 0,
		[DURATIONS.SpanAllDay]: 0,
	};
	events.forEach((event) => {
		if (event.allDay) histogram[DURATIONS.SpanAllDay]++;
		else {
			const start = new Date(event.start);
			const end = new Date(event.end);
			const durationInHours =
				(end.getTime() - start.getTime()) / (1000 * 60 * 60);
			if (durationInHours <= 1) histogram[DURATIONS.ZeroToOne]++;
			else if (durationInHours <= 2) histogram[DURATIONS.OneToTwo]++;
			else if (durationInHours <= 4) histogram[DURATIONS.TwoToFour]++;
			else histogram[DURATIONS.moreThanFour]++;
		}
	});
	return Object.entries(histogram).map(([hours, count]) => ({ hours, count }));
}
