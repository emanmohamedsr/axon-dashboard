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
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import useCalendarEvents from "../hooks/useCalendarEvents";
import { getEventsHistogramAnalytics } from "../utils/eventsHistogramAnalytics";

export const description = "A bar chart";

const chartConfig = {
	desktop: {
		label: "Events Duration (hours)",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

interface EventsHistogramProps {
	className?: string;
}

export default function EventsHistogram({ className }: EventsHistogramProps) {
	const events = useCalendarEvents().events;
	const chartData = useMemo(
		() => getEventsHistogramAnalytics(events),
		[events],
	);
	return (
		<Card
			className={cn("bg-background rounded-md shadow-xl border", className)}>
			<CardHeader>
				<CardTitle>Events Duration Histogram</CardTitle>
				<CardDescription>Events duration distribution in hours</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='hours'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey='count' fill='var(--color-desktop)' radius={8} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 leading-none font-medium'>
					total Events {events.length} <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>
					Showing total events for your calendar
				</div>
			</CardFooter>
		</Card>
	);
}
