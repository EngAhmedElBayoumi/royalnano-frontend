"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  format?: 'number' | 'currency' | 'percentage';
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  trend = 'stable',
  format = 'number',
  icon,
  className,
  loading = false,
}: KPICardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </CardTitle>
          {icon && (
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          )}
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {change !== undefined && (
          <div className={cn("flex items-center text-xs", getTrendColor())}>
            {getTrendIcon()}
            <span className="ml-1">
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

