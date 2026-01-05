import { NativeCalendarView } from "@/features/calendar/components";
import { TeamTable } from "@/features/team/components";

const LandingPage = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 justify-center'>
			<div className='h-[450px] overflow-auto'>
				<TeamTable />
			</div>
			<div className='h-[450px] overflow-auto'>
				<NativeCalendarView />
			</div>
			<div>maps</div>
			<div>tasks</div>
		</div>
	);
};

export default LandingPage;
