import { NativeCalendarView } from "@/features/calendar/components";
import TaskTable from "@/features/tasks/components/table/TaskTable";
import { TeamTable } from "@/features/team/components";

const LandingPage = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 justify-center'>
			<div className='h-[465px] overflow-hidden border rounded-md p-2'>
				<TeamTable isWidgetMode={true} />
			</div>
			<div className='h-[465px] overflow-hidden border rounded-md p-2'>
				<NativeCalendarView isWidgetMode={true} />
			</div>
			<div>maps</div>
			<div>
				<TaskTable isWidgetMode={true} />
			</div>
		</div>
	);
};

export default LandingPage;
