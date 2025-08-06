"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { Ghost } from "lucide-react";

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

  if (matchHistory.length === 0) {
    return (
      <div className="playerChartStatsCard">
        <h1 className="font-extrabold text-xl">KDA Trend</h1>
        <div className="font-bold text-xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playerChartStatsCard !p-0">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">KDA Trend</CardTitle>
          <CardDescription className="text-[var(--secondary-text)] font-bold">
            Showing KDA from the past {matchHistory.length} matches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="sm:max-h-[25vh]
            min-h-[25vh] w-full border-none"
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
    </div>
  );
}

export default PlayerStatsChart;
