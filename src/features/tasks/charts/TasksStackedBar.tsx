"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";
import useTask from "../hooks/useTaskStore";
import {
	getTasksPriorityStatusData,
	getTotalDoneTasks,
} from "../utils/taskBarChartAnalytics";

export const description = "A stacked bar chart with a legend";

const chartConfig = {
	done: {
		label: "Done",
		color: "var(--chart-1)",
	},
	inProgress: {
		label: "In Progress",
		color: "var(--chart-4)",
	},
	todo: {
		label: "To Do",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

export default function TasksStackedBar() {
	const tasks = useTask().tasks;

	const chartData = useMemo(() => getTasksPriorityStatusData(tasks), [tasks]);
	const totalDoneTasks = useMemo(() => getTotalDoneTasks(tasks), [tasks]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Tasks Stackedbar</CardTitle>
				<CardDescription>Tasks Priorities and Status</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='priority'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar
							dataKey='done'
							stackId='a'
							fill='var(--chart-1)'
							radius={[0, 0, 4, 4]}
						/>
						<Bar
							dataKey='inProgress'
							stackId='a'
							fill='var(--chart-5)'
							radius={[4, 4, 0, 0]}
						/>
						<Bar
							dataKey='todo'
							stackId='a'
							fill='var(--chart-4)'
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 leading-none font-medium'>
					Total Done Tasks {totalDoneTasks} <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Showing tasks by their priority and status.
				</div>
			</CardFooter>
		</Card>
	);
}
