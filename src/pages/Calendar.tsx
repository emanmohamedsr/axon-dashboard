import EventsHistogram from "@/features/calendar/charts/EventsHistogram";
import {
	EventsList,
	MainCalendarView,
	ResponsiveModal,
} from "@/features/calendar/components";
import { cn } from "@/lib/utils";
import useMeidaQuery from "@/shared/hooks/use-media-query";

const CalendarPage = () => {
	const isDesktop = useMeidaQuery("(min-width: 1400px)");
	return (
		<div>
			<div className='min-h-screen bg-background text-foreground flex items-start justify-center gap-20 lg:p-6'>
				<MainCalendarView />
				<ResponsiveModal>
					<div className={cn("flex flex-col justify-center gap-2 h-[780px]")}>
						<EventsList />
						{isDesktop && <EventsHistogram className='w-[300px]' />}
					</div>
				</ResponsiveModal>
			</div>
			{!isDesktop && <EventsHistogram className='max-w-[670px] mx-auto ' />}
		</div>
	);
};

export default CalendarPage;
