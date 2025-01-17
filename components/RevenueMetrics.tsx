"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "January", commissionEarned: 160, totalPayouts: 80 },
	{ month: "February", commissionEarned: 305, totalPayouts: 200 },
	{ month: "March", commissionEarned: 237, totalPayouts: 120 },
	{ month: "April", commissionEarned: 73, totalPayouts: 190 },
	{ month: "May", commissionEarned: 209, totalPayouts: 130 },
	{ month: "June", commissionEarned: 214, totalPayouts: 140 },
	{ month: "April", commissionEarned: 73, totalPayouts: 190 },
	{ month: "May", commissionEarned: 209, totalPayouts: 130 },
	{ month: "June", commissionEarned: 214, totalPayouts: 140 },
];

const chartConfig = {
	commissionEarned: {
		label: "Commission Earned",
		color: "#3377FF",
	},
	totalPayouts: {
		label: "Total Payouts",
		color: "#DC9F54B5",
	},
} satisfies ChartConfig;

export default function RevenueMetrics() {
	return (
		<ChartContainer
			config={chartConfig}
			className="h-[211px]  w-full"
		>
			<BarChart
				accessibilityLayer
				data={chartData}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="commissionEarned"
					fill="var(--color-commissionEarned)"
					radius={2}
					barSize={15}
				/>
				<Bar
					dataKey="totalPayouts"
					fill="var(--color-totalPayouts)"
					radius={2}
					barSize={15}
				/>
			</BarChart>
		</ChartContainer>
	);
}
