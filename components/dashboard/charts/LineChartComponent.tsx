"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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

interface LineChartComponentProps<T extends Record<string, unknown>> {
  chartData: T[];
  config: ChartConfig;
  xKey: keyof T;
  yKeys: Array<keyof T>;
  title: string;
  description?: string;
  footerData?: {
    text: string;
    subText: string;
    icon?: React.ReactNode;
  };
  containerStyle?: React.CSSProperties;
  curved?: boolean;
  showDots?: boolean;
  loading?: boolean;
}

export function LineChartComponent<T extends Record<string, unknown>>({
  chartData,
  config,
  xKey,
  yKeys,
  title,
  description,
  footerData,
  containerStyle,
  curved = true,
  showDots = true,
  loading = false,
}: LineChartComponentProps<T>) {
  if (loading) {
    return (
      <Card style={containerStyle}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
          {description && (
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mt-2"></div>
          )}
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={containerStyle}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xKey as string}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {yKeys.map((key, index) => (
                <Line
                  key={key as string}
                  type={curved ? "monotone" : "linear"}
                  dataKey={key as string}
                  stroke={
                    config[key as string]?.color ||
                    `var(--color-line-${index + 1})`
                  }
                  strokeWidth={2}
                  dot={showDots ? { r: 4 } : false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
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

