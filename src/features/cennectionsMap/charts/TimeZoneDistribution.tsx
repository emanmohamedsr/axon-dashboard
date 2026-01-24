"use client";

import { TrendingUp } from "lucide-react";
// 1. إضافة Cell للاستيراد عشان نلون كل عمود بلونه الخاص
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
	Cell,
} from "recharts";

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
import { useMemo } from "react";
import getMembersByRegion, { totalMembers } from "../utils/BarChartanAnalytics";
import { chartColors, createChartConfig } from "../constants";

export default function TimeZoneDistribution() {
	const teamMembers = useTeam().team;

	const chartData = useMemo(() => {
		if (!teamMembers) return [];

		const rawData = getMembersByRegion(teamMembers);
		return rawData.map((item) => ({
			...item,
			fill: chartColors[0],
		}));
	}, [teamMembers]);

	const chartConfig = useMemo(() => {
		const regions = chartData.map((d) => d.region);
		return createChartConfig(regions);
	}, [chartData]);

	const totalCount = useMemo(() => totalMembers(chartData), [chartData]);

	return (
		<Card className='h-full w-full flex flex-col'>
			<CardHeader>
				<CardTitle>Team Distribution</CardTitle>
				<CardDescription>Members by Location</CardDescription>
			</CardHeader>
			<CardContent className='flex-1'>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						barCategoryGap='10%'
						margin={{ right: 16 }}>
						<CartesianGrid horizontal={false} />

						<YAxis
							dataKey='region'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							hide
						/>

						<XAxis dataKey='members' type='number' hide />

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>

						<Bar dataKey='members' layout='vertical' radius={4} barSize={32}>
							{chartData.map((e, index) => (
								<Cell key={`cell-${index}`} fill={e.fill} />
							))}

							<LabelList
								dataKey='region'
								position='insideLeft'
								offset={8}
								className='fill-white'
								fontSize={12}
							/>

							<LabelList
								dataKey='members'
								position='right'
								offset={8}
								className='fill-foreground'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 leading-none font-medium'>
					Total Members active: {totalCount} <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Showing distribution across all active regions
				</div>
			</CardFooter>
		</Card>
	);
}
