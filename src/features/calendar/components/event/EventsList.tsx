import useCalendarEvents from "../../hooks/useCalendarEvents";
import { EventListItem } from "@/features/calendar/components";
import { BellRing } from "lucide-react";
const EventsList = () => {
	const { events, toggleDone } = useCalendarEvents();
	return (
		<div className='w-[200px] sm:w-[250px] md:w-[300px] bg-background rounded-md shadow-xl border h-full overflow-hidden flex flex-col'>
			{/* header */}
			<div className='flex-none bg-axon-gradient h-20 md:h-20 flex flex-col justify-center gap-2 px-6'>
				<header className='flex items-center gap-2'>
					<BellRing className='w-5 h-5 text-axon-text-color' />
					<p className='text-axon-text-color font-bold md:text-2xl'>Events</p>
				</header>
			</div>
			{/* events */}
			<div className='flex-1 flex flex-col mt-[17px] px-4 min-h-0 pb-4'>
				<div className='flex-1 overflow-y-auto pr-2'>
					<div className='flex flex-col gap-6'>
						{events?.map((event) => (
							<EventListItem
								key={event.id}
								event={event}
								toggleDone={toggleDone}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventsList;
