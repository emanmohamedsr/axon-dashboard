import EventsHistogram from "@/features/calendar/charts/EventsHistogram";
import { NativeCalendarView } from "@/features/calendar/components";
import TeamStatus from "@/features/cennectionsMap/charts/TeamStatus";
import TimeZoneDistribution from "@/features/cennectionsMap/charts/TimeZoneDistribution";
import MapMainView from "@/features/cennectionsMap/components/MapMainView";
import TasksStackedBar from "@/features/tasks/charts/TasksStackedBar";
import TaskStatusRadial from "@/features/tasks/charts/TaskStatusRadial";
import { KanbanBoard } from "@/features/tasks/components";
import { TeamTable } from "@/features/team/components";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
	CalendarDays,
	Globe,
	KanbanSquare,
	Users,
	BarChart3,
	PieChart,
} from "lucide-react";

import { ResponsiveContainer } from "recharts";

const headerClass = "flex items-center gap-2 border-b bg-muted/10 px-4 py-3";
const titleClass =
	"text-xs font-semibold uppercase tracking-wide text-muted-foreground";
const contentClass = "flex-1 min-h-0 p-3 overflow-hidden";

const chartWrapper =
	"relative w-full h-[300px] flex justify-center items-center";

const LandingPage = () => {
	return (
		<div className='min-h-screen bg-muted/5 p-4'>
			<div className='grid grid-cols-1 gap-4 lg:grid-cols-3 auto-rows-[420px]'>
				{/* ===== Tasks ===== */}
				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<KanbanSquare className='h-4 w-4' />
						<CardTitle className={titleClass}>Tasks Overview</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<KanbanBoard isWidgetMode />
					</CardContent>
				</Card>

				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<BarChart3 className='h-4 w-4' />
						<CardTitle className={titleClass}>Tasks Status</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<div className={chartWrapper}>
							<ResponsiveContainer width='100%' height='100%'>
								<TasksStackedBar isWidgetMode />
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<PieChart className='h-4 w-4' />
						<CardTitle className={titleClass}>Tasks Distribution</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<div className={`${chartWrapper} flex items-center justify-center`}>
							<ResponsiveContainer width='100%' height='100%'>
								<TaskStatusRadial isWidgetMode />
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* ===== Calendar ===== */}
				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<CalendarDays className='h-4 w-4' />
						<CardTitle className={titleClass}>Events Histogram</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<div className={chartWrapper}>
							<ResponsiveContainer width='100%' height='100%'>
								<EventsHistogram isWidgetMode />
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className='flex flex-col lg:col-span-2'>
					<CardHeader className={headerClass}>
						<CalendarDays className='h-4 w-4' />
						<CardTitle className={titleClass}>Schedule</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<NativeCalendarView isWidgetMode />
					</CardContent>
				</Card>

				{/* ===== Connections ===== */}
				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<PieChart className='h-4 w-4' />
						<CardTitle className={titleClass}>Team Status</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<div className={chartWrapper}>
							<ResponsiveContainer width='100%' height='100%'>
								<TeamStatus isWidgetMode />
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className='flex flex-col lg:col-span-2'>
					<CardHeader className={headerClass}>
						<Globe className='h-4 w-4' />
						<CardTitle className={titleClass}>Global Connections</CardTitle>
					</CardHeader>
					<CardContent className='flex-1 min-h-0 p-0 overflow-hidden'>
						<MapMainView isWideView />
					</CardContent>
				</Card>

				{/* ===== Team ===== */}
				<Card className='flex flex-col'>
					<CardHeader className={headerClass}>
						<BarChart3 className='h-4 w-4' />
						<CardTitle className={titleClass}>Time Zone Distribution</CardTitle>
					</CardHeader>
					<CardContent className={contentClass}>
						<div className={chartWrapper}>
							<ResponsiveContainer width='100%' height='100%'>
								<TimeZoneDistribution isWidgetMode />
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className='flex flex-col lg:col-span-2'>
					<CardHeader className={headerClass}>
						<Users className='h-4 w-4' />
						<CardTitle className={titleClass}>Team Members</CardTitle>
					</CardHeader>
					<CardContent className='flex-1 min-h-0 p-3 overflow-auto'>
						<TeamTable isWidgetMode />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LandingPage;
