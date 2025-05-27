"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MatchForChart } from "@/types/MatchForChart";
import { getKDA } from "@/lib/utils";

export function PlayerStatsChart({
  matchHistory,
}: {
  matchHistory: MatchForChart[];
}) {
  const chartData = matchHistory.map((match, index) => ({
    match: (index + 1).toString(),
    KDA: getKDA(
      match.player_performance.kills,
      match.player_performance.deaths,
      match.player_performance.assists
    ),
  }));

  const chartConfig = {
    KDA: {
      label: "KDA",
      color: "var(--purple)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="font-extrabold">KDA Trend</CardTitle>
        <CardDescription className="text-[var(--secondary-text)] font-bold">
          Showing KDA from the past 20 matches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full max-h-[250px] border-none"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="match"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="KDA"
              type="linear"
              fill="var(--purple)"
              fillOpacity={0.4}
              stroke="var(--purple)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PlayerStatsChart;
