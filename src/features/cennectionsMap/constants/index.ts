import type { ChartConfig } from "@/components/ui/chart";

export const chartColors = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export const createChartConfig = (regions: string[]) => {
	const dynamicConfig = regions.reduce(
		(acc, region, index) => {
			acc[region] = {
				label: region,
				color: chartColors[index % chartColors.length],
			};
			return acc;
		},
		{} as Record<string, { label: string; color: string }>,
	);

	return {
		members: { label: "Members" },
		...dynamicConfig,
	} satisfies ChartConfig;
};
