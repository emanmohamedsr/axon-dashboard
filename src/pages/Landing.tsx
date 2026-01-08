import { NativeCalendarView } from "@/features/calendar/components";
import { KanbanBoard } from "@/features/tasks/components";
import { TeamTable } from "@/features/team/components";

const LandingPage = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 justify-center'>
			<div>
				<KanbanBoard isWidgetMode={true} />
			</div>
			<div className='h-[500px] overflow-hidden border rounded-md p-2'>
				<TeamTable isWidgetMode={true} />
			</div>
			<div className='h-[500px] overflow-hidden border rounded-md p-2'>
				<NativeCalendarView isWidgetMode={true} />
			</div>
			<div>maps</div>
		</div>
	);
};

export default LandingPage;
