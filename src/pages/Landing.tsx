import { NativeCalendarView } from "@/features/calendar/components";
import TeamStatus from "@/features/cennectionsMap/charts/TeamStatus";
import TimeZoneDistribution from "@/features/cennectionsMap/charts/TimeZoneDistribution";
import MapMainView from "@/features/cennectionsMap/components/MapMainView";
import TasksStackedBar from "@/features/tasks/charts/TasksStackedBar";
import TaskStatusRadial from "@/features/tasks/charts/TaskStatusRadial";
import { KanbanBoard } from "@/features/tasks/components";
import { TeamTable } from "@/features/team/components";
import { cn } from "@/lib/utils";
import {
	CalendarDays,
	Globe,
	KanbanSquare,
	Users,
	BarChart3,
	PieChart,
} from "lucide-react";

const LandingPage = () => {
	const cardStyle =
		"flex flex-col overflow-hidden border rounded-xl bg-background shadow-sm transition-all hover:shadow-md h-[520px]";

	const widgetHeaderStyle =
		"flex items-center gap-2 border-b px-4 py-3 bg-muted/20 text-sm font-medium text-muted-foreground";

	const widgetContentStyle = "flex-1 p-2 relative min-h-0 overflow-hidden";

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 items-start bg-muted/10 min-h-screen'>
			{/* tasks */}
			<div className={cn(cardStyle, "col-span-1 h-[400px]")}>
				<div className={widgetHeaderStyle}>
					<KanbanSquare className='h-4 w-4' />
					<span>Tasks Overview</span>
				</div>
				<div className={widgetContentStyle}>
					<KanbanBoard isWidgetMode={true} />
				</div>
			</div>
			<div className={cn(cardStyle, "col-span-1 h-[400px]")}>
				<div className={widgetHeaderStyle}>
					<PieChart className='h-4 w-4' />
					<span>Tasks Status</span>
				</div>
				<div className={widgetContentStyle}>
					<TasksStackedBar />
				</div>
			</div>
			<div className={cn(cardStyle, "col-span-1 h-[400px]")}>
				<div className={widgetHeaderStyle}>
					<PieChart className='h-4 w-4' />
					<span>Tasks Stackedbar</span>
				</div>
				<div className={widgetContentStyle}>
					<TaskStatusRadial />
				</div>
			</div>

			{/* calendar */}
			<div className={cn(cardStyle, "col-span-2")}>
				<div className={widgetHeaderStyle}>
					<CalendarDays className='h-4 w-4' />
					<span>Schedule</span>
				</div>
				<div className={widgetContentStyle}>
					<NativeCalendarView isWidgetMode={true} />
				</div>
			</div>
			<div className={`${cardStyle} col-span-1`}>
				<div className={widgetHeaderStyle}>
					<CalendarDays className='h-4 w-4' />
					<span>Schedule</span>
				</div>
			</div>

			{/* connections */}
			<div className={cn(cardStyle, "col-span-2 xl:col-span-2")}>
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
			<div className={`${cardStyle} col-span-1`}>
				<div className={widgetHeaderStyle}>
					<PieChart className='h-4 w-4' />
					<span>Team Status</span>
				</div>
				<div className={widgetContentStyle}>
					<TeamStatus />
				</div>
			</div>
			{/* team */}
			<div className={cn(cardStyle, "col-span-1")}>
				<div className={widgetHeaderStyle}>
					<BarChart3 className='h-4 w-4' />
					<span>Time Zone Distribution</span>
				</div>
				<div className={widgetContentStyle}>
					<TimeZoneDistribution />
				</div>
			</div>
			<div className={cn(cardStyle, "col-span-1 lg:col-span-2 2xl:col-span-2")}>
				<div className={widgetHeaderStyle}>
					<Users className='h-4 w-4' />
					<span>Team Members</span>
				</div>
				<div className={`${widgetContentStyle} overflow-auto`}>
					<TeamTable isWidgetMode={true} />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
