"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WinLossData {
  name: string;
  wins: number;
  losses: number;
  total: number;
  winRate: string;
}

const rawData = [{ name: "All", wins: 54, losses: 22 }];

// Add derived fields
const chartData: WinLossData[] = rawData.map((d) => {
  const total = d.wins + d.losses;
  const winRate = total ? ((d.wins / total) * 100).toFixed(2) + "%" : "0.00%";
  return { ...d, total, winRate };
});

const chartColors = {
  wins: "var(--blue)",
  losses: "var(--red)",
};

export default function page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Win/Loss Distribution</CardTitle>
        <CardDescription>Player Statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="50%" height={chartData.length * 50}>
          <BarChart
            layout="vertical"
            data={chartData}
            barCategoryGap={20}
            margin={{ top: 0, right: 50, left: 50, bottom: 0 }}
          >
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <XAxis type="number" hide />

            <Bar
              dataKey="wins"
              stackId="a"
              fill={chartColors.wins}
              radius={[8, 0, 0, 8]}
              barSize={20}
            >
              <LabelList
                dataKey="wins"
                position="insideLeft"
                formatter={(value: number) => `${value}W`}
                fill="white"
                fontSize={12}
                fontWeight={700}
              />
            </Bar>

            <Bar
              dataKey="losses"
              stackId="a"
              fill={chartColors.losses}
              radius={[0, 8, 8, 0]}
              barSize={20}
            >
              <LabelList
                dataKey="losses"
                position="insideRight"
                formatter={(value: number) => `${value}L`}
                fill="white"
                fontSize={12}
                fontWeight={700}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Optional: Display win rate separately below chart */}
        <div className="mt-2 flex flex-col gap-2">
          {chartData.map((d, i) => (
            <div key={i} className="flex justify-between text-sm text-muted">
              <span>Games: {d.total}</span>
              <span className="text-[var(--green)] font-semibold">
                {d.winRate}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
