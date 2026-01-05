import {
	EventsList,
	MainCalendarView,
	ResponsiveModal,
} from "@/features/calendar/components";

const CalendarPage = () => {
	return (
		<div className='min-h-screen bg-background text-foreground flex items-start justify-center gap-20 lg:p-6'>
			<MainCalendarView />
			<ResponsiveModal>
				<EventsList />
			</ResponsiveModal>
		</div>
	);
};

export default CalendarPage;
