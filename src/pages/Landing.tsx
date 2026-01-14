import { NativeCalendarView } from "@/features/calendar/components";
import MapMainView from "@/features/cennectionsMap/components/MapMainView";
import { KanbanBoard } from "@/features/tasks/components";
import { TeamTable } from "@/features/team/components";
import { CalendarDays, Globe, KanbanSquare, Users } from "lucide-react";

const LandingPage = () => {
	const cardStyle =
		"flex flex-col overflow-hidden border rounded-xl bg-background shadow-sm";

	const widgetHeaderStyle =
		"flex items-center gap-2 border-b px-4 py-3 bg-muted/20 text-sm font-medium text-muted-foreground";

	const widgetContentStyle = "flex-1 p-2 relative min-h-0";

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-4 items-start bg-muted/10 min-h-screen'>
			<div className={`${cardStyle} lg:col-span-1 h-[550px]`}>
				<div className={widgetHeaderStyle}>
					<KanbanSquare className='h-4 w-4' />
					<span>Tasks Overview</span>
				</div>
				<div className={widgetContentStyle}>
					<KanbanBoard isWidgetMode={true} />
				</div>
			</div>

			<div className={`${cardStyle} h-[550px] grow`}>
				<div className={widgetHeaderStyle}>
					<Globe className='h-4 w-4' />
					<span>Global Connections</span>
				</div>
				<div className='flex-1 p-0 relative min-h-0'>
					<div className='h-full w-full'>
						<MapMainView isWideView={true} />
					</div>
				</div>
			</div>

			<div className={`${cardStyle} h-[550px]`}>
				<div className={widgetHeaderStyle}>
					<Users className='h-4 w-4' />
					<span>Team Members</span>
				</div>
				<div className={`${widgetContentStyle} overflow-auto`}>
					<TeamTable isWidgetMode={true} />
				</div>
			</div>

			<div className={`${cardStyle} h-[550px]`}>
				<div className={widgetHeaderStyle}>
					<CalendarDays className='h-4 w-4' />
					<span>Schedule</span>
				</div>
				<div className={widgetContentStyle}>
					<NativeCalendarView isWidgetMode={true} />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
