"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";
import useTask from "../hooks/useTaskStore";
import { TaskStatusCount } from "../utils/taskRadialChartAnalysis";

export const description = "A radial chart with a label";

const chartConfig = {
	status: {
		label: "Status",
	},
	Done: {
		label: "Done",
		color: "var(--chart-1)",
	},
	InProgress: {
		label: "In Progress",
		color: "var(--chart-2)",
	},
	Todo: {
		label: "To Do",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

export default function TaskStatusRadial() {
	const tasks = useTask().tasks;
	const chartData = useMemo(() => TaskStatusCount(tasks), [tasks]);
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Task Status Radial</CardTitle>
				<CardDescription>Tasks Status Distribution</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'>
					<RadialBarChart
						data={chartData}
						startAngle={-90}
						endAngle={380}
						innerRadius={30}
						outerRadius={110}>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel nameKey='status' />}
						/>
						<RadialBar dataKey='count' background>
							<LabelList
								position='insideStart'
								dataKey='status'
								className='fill-white capitalize mix-blend-luminosity'
								fontSize={11}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none font-medium'>
					toatal tasks {tasks.length} <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Showing total tasks status distribution
				</div>
			</CardFooter>
		</Card>
	);
}
