"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Adjusted chart data with CSS variables for colors
const chartData = [
  { stat: "wins", visitors: 275, fill: "var(--blue)" },
  { stat: "loses", visitors: 200, fill: "var(--red)" },
];

// Clean chartConfig since you're not mapping by browser here
const chartConfig = {
  wins: {
    label: "Wins",
    color: "hsl(var(--blue))",
  },
  loses: {
    label: "Loses",
    color: "hsl(var(--red))",
  },
} satisfies ChartConfig;

function Page() {
  return (
    <Card className="flex flex-col border-transparent">
      <CardContent className="flex justify-center items-center border-transparent">
        <ChartContainer
          config={chartConfig}
          className="w-[50px] h-[50px]" // fixed size
        >
          <PieChart width={50} height={50}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="stat"
              outerRadius={25}
              innerRadius={15}
              stroke="none"
              isAnimationActive={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Page;
