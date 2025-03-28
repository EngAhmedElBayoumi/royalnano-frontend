"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface AreaChartComponentProps<T extends Record<string, unknown>> {
  chartData: T[]; // Generic type for flexible chart data
  config: ChartConfig; // Dynamic chart configuration
  xKey: keyof T; // Key for the X-axis
  yKeys: Array<keyof T>; // Keys for the Y-axis (multiple areas)
  title: string;
  description: string;
  footerData?: {
    text: string;
    subText: string;
    icon?: React.ReactNode;
  };
  containerStyle?: React.CSSProperties; // Add containerStyle prop for custom styles
}

export function AreaChartComponent<T extends Record<string, unknown>>({
  chartData,
  config,
  xKey,
  yKeys,
  title,
  description,
  footerData,
  containerStyle, // Accept containerStyle prop
}: AreaChartComponentProps<T>) {
  return (
    <Card style={containerStyle}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey as string} // Use the dynamic X-axis key
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {yKeys.map((key, index) => (
              <Area
                key={key as string}
                dataKey={key as string} // Use the dynamic Y-axis keys
                type="natural"
                fill={
                  config[key as string]?.color ||
                  `var(--color-area-${index + 1})`
                }
                fillOpacity={0.4}
                stroke={
                  config[key as string]?.color ||
                  `var(--color-area-${index + 1})`
                }
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {footerData && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {footerData.text} {footerData.icon && footerData.icon}
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {footerData.subText}
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
