"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
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

interface PieChartComponentProps {
  chartData: Array<{
    name: string;
    value: number;
    fill?: string;
  }>;
  config: ChartConfig;
  title: string;
  description?: string;
  footerData?: {
    text: string;
    subText: string;
    icon?: React.ReactNode;
  };
  containerStyle?: React.CSSProperties;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  loading?: boolean;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function PieChartComponent({
  chartData,
  config,
  title,
  description,
  footerData,
  containerStyle,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80,
  loading = false,
}: PieChartComponentProps) {
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

  // Add colors to data if not provided
  const dataWithColors = chartData.map((entry, index) => ({
    ...entry,
    fill: entry.fill || COLORS[index % COLORS.length],
  }));

  return (
    <Card style={containerStyle}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataWithColors}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey="value"
              >
                {dataWithColors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend && (
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">{value}</span>
                  )}
                />
              )}
            </PieChart>
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

