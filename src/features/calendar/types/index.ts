export interface CalendarEvent {
	id: string;
	title: string;
	description?: string;
	start: string | Date;
	end: string | Date;
	allDay?: boolean;
	backgroundColor?: string;
	borderColor?: string;
	status?: statusType;
}

export type statusType = "done" | "inprogress" | "pending";
