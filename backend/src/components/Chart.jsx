"use client";

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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Add a random color to each data point in chartData
const chartData = [
  { month: "January", desktop: 186, fill: getRandomColor() },
  { month: "February", desktop: 305, fill: getRandomColor() },
  { month: "March", desktop: 237, fill: getRandomColor() },
  { month: "April", desktop: 73, fill: getRandomColor() },
  { month: "May", desktop: 209, fill: getRandomColor() },
  { month: "June", desktop: 214, fill: getRandomColor() },
  { month: "July", desktop: 214, fill: getRandomColor() },
  { month: "August", desktop: 214, fill: getRandomColor() },
  { month: "September", desktop: 214, fill: getRandomColor() },
  { month: "October", desktop: 214, fill: getRandomColor() },
  { month: "November", desktop: 73, fill: getRandomColor() },
  { month: "December", desktop: 73, fill: getRandomColor() },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FF1493", // Default color (can be ignored since we're using random colors)
  },
};

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
            <h1>Total Blogs</h1>
            <span className="text-2xl text-blue-500">1 / 365</span>
          </div>
        </CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            className="text-blue-600"
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="desktop"
              fill={(entry) => entry.fill} // Use the random color from the data
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total blogs for the last year
        </div>
      </CardFooter>
    </Card>
  );
}
