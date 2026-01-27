"use client";

import { useMemo } from "react"; // 👈 استيراد useMemo
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
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
} from "@/components/ui/chart";
import useTeam from "@/features/team/hooks/useTeam";
import {
	getMembersStatus,
	highestStatusIndex,
	totalActiveMembers,
} from "../utils/PieChartAnalytics";
import { chartColors, createChartConfig } from "../constants";
interface TeamStatusProps {
	isWidgetMode?: boolean;
}

export default function TeamStatus({ isWidgetMode = false }: TeamStatusProps) {
	const teamMembers = useTeam().team;

	const chartData = useMemo(() => {
		if (!teamMembers) return [];
		const rawData = getMembersStatus(teamMembers);
		return rawData.map((item, index) => ({
			...item,
			fill: chartColors[index % chartColors.length],
		}));
	}, [teamMembers]);

	const chartConfig = useMemo(() => {
		const statuses = chartData.map((d) => d.status);
		return createChartConfig(statuses);
	}, [chartData]);

	const activeIndex = useMemo(() => highestStatusIndex(chartData), [chartData]);
	const activeMembers = useMemo(
		() => totalActiveMembers(teamMembers),
		[teamMembers],
	);

	if (isWidgetMode)
		return (
			<ChartContainer
				config={chartConfig}
				className='mx-auto aspect-square max-h-[250px]'>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartData}
						dataKey='count'
						nameKey='status'
						innerRadius={60}
						strokeWidth={5}
						activeIndex={activeIndex}
						activeShape={({ outerRadius = 0, ...props }: any) => (
							<Sector {...props} outerRadius={outerRadius + 10} />
						)}
					/>
				</PieChart>
			</ChartContainer>
		);

	return (
		<Card className='flex flex-col w-full h-full'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Team Status</CardTitle>
				<CardDescription>Team Members by Status</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='count'
							nameKey='status'
							innerRadius={60}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }: any) => (
								<Sector {...props} outerRadius={outerRadius + 10} />
							)}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='text-start flex flex-col items-start gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none font-medium'>
					Total Active Members: {activeMembers}{" "}
					<TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Showing distribution across active regions
				</div>
			</CardFooter>
		</Card>
	);
}
