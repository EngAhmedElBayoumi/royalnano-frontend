"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Settings, Plus } from "lucide-react";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import { KPICard } from "@/components/dashboard/charts/KPICard";
import { AreaChartComponent } from "@/components/dashboard/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/dashboard/charts/BarChartComponent";
import { PieChartComponent } from "@/components/dashboard/charts/PieChartComponent";
import { LineChartComponent } from "@/components/dashboard/charts/LineChartComponent";
import { DateRangeFilter } from "@/components/dashboard/filters/DateRangeFilter";
import {
  useGetKPIsQuery,
  useGetDashboardDataMutation,
  useGetDashboardsQuery,
  AnalyticsFilter,
} from "@/redux/services/analytics/analyticsApi";

export default function AnalyticsPage() {
  const [filters, setFilters] = useState<AnalyticsFilter>({
    period: "last_30_days",
  });
  const [selectedDashboard, setSelectedDashboard] = useState<number | null>(null);

  // API hooks
  const { data: dashboards, isLoading: dashboardsLoading } = useGetDashboardsQuery({});
  const { data: kpisData, isLoading: kpisLoading, error: kpisError } = useGetKPIsQuery({ filters });
  const [getDashboardData, { data: dashboardData, isLoading: dashboardLoading, error: dashboardError }] = useGetDashboardDataMutation();

  // Set default dashboard
  useEffect(() => {
    if (dashboards && dashboards.length > 0 && !selectedDashboard) {
      const defaultDashboard = dashboards.find(d => d.is_default) || dashboards[0];
      setSelectedDashboard(defaultDashboard.id);
    }
  }, [dashboards, selectedDashboard]);

  // Fetch dashboard data when filters or dashboard changes
  useEffect(() => {
    if (selectedDashboard) {
      getDashboardData({ dashboard_id: selectedDashboard, filters });
    }
  }, [filters, selectedDashboard, getDashboardData]);

  const handleRefresh = () => {
    if (selectedDashboard) {
      getDashboardData({ dashboard_id: selectedDashboard, filters });
    }
  };

  const renderWidget = (widget: any) => {
    const { widget_type, data, title, config } = widget;

    if (widget.error) {
      return (
        <Card key={widget.widget_id} className="col-span-1">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600">{widget.error}</p>
          </CardContent>
        </Card>
      );
    }

    const commonProps = {
      title,
      loading: dashboardLoading,
      containerStyle: {
        gridColumn: `span ${widget.position.width}`,
        gridRow: `span ${widget.position.height}`,
      },
    };

    switch (widget_type) {
      case 'number_card':
        return (
          <KPICard
            key={widget.widget_id}
            title={title}
            value={data.value || 0}
            change={data.change_percentage}
            trend={data.trend}
            format={data.format}
            loading={dashboardLoading}
            className="col-span-1"
          />
        );

      case 'line_chart':
        return (
          <LineChartComponent
            key={widget.widget_id}
            chartData={data.datasets?.[0]?.data?.map((value: number, index: number) => ({
              [data.labels?.[index] || `Point ${index}`]: value,
              date: data.labels?.[index] || `Point ${index}`,
            })) || []}
            config={{
              value: { label: data.datasets?.[0]?.label || "Value", color: "hsl(var(--chart-1))" }
            }}
            xKey="date"
            yKeys={["value"]}
            {...commonProps}
          />
        );

      case 'bar_chart':
        return (
          <BarChartComponent
            key={widget.widget_id}
            chartData={data.datasets?.[0]?.data?.map((value: number, index: number) => ({
              name: data.labels?.[index] || `Item ${index}`,
              value,
            })) || []}
            config={{
              value: { label: data.datasets?.[0]?.label || "Value", color: "hsl(var(--chart-1))" }
            }}
            xKey="name"
            yKeys={["value"]}
            {...commonProps}
          />
        );

      case 'pie_chart':
      case 'donut_chart':
        return (
          <PieChartComponent
            key={widget.widget_id}
            chartData={data.datasets?.[0]?.data?.map((value: number, index: number) => ({
              name: data.labels?.[index] || `Item ${index}`,
              value,
            })) || []}
            config={{}}
            innerRadius={widget_type === 'donut_chart' ? 40 : 0}
            {...commonProps}
          />
        );

      case 'area_chart':
        return (
          <AreaChartComponent
            key={widget.widget_id}
            chartData={data.datasets?.[0]?.data?.map((value: number, index: number) => ({
              date: data.labels?.[index] || `Point ${index}`,
              value,
            })) || []}
            config={{
              value: { label: data.datasets?.[0]?.label || "Value", color: "hsl(var(--chart-1))" }
            }}
            xKey="date"
            yKeys={["value"]}
            {...commonProps}
          />
        );

      default:
        return (
          <Card key={widget.widget_id} className="col-span-1">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unsupported widget type: {widget_type}
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  if (dashboardsLoading) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/analytics.svg"
            title="Analytics Dashboard"
            backgroundColor="#F8F7F7"
            textColor="primary"
          />
        </div>
        <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (kpisError || dashboardError) {
    return (
      <main className="mx-4 sm:mx-7 my-5">
        <div className="flex">
          <IconWithTitle
            imageSrc="/assets/icons/sidebar/analytics.svg"
            title="Analytics Dashboard"
            backgroundColor="#F8F7F7"
            textColor="primary"
          />
        </div>
        <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
          <LoadingError />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/sidebar/analytics.svg"
          title="Analytics Dashboard"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      
      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <DateRangeFilter
              value={filters}
              onChange={setFilters}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={kpisLoading || dashboardLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${(kpisLoading || dashboardLoading) ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </div>
        </div>

        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpisData?.map((kpi, index) => (
            <KPICard
              key={kpi.key}
              title={kpi.label}
              value={kpi.value}
              change={kpi.change_percentage}
              trend={kpi.trend}
              format={kpi.format}
              loading={kpisLoading}
            />
          )) || [...Array(4)].map((_, i) => (
            <KPICard
              key={i}
              title=""
              value={0}
              loading={true}
            />
          ))}
        </div>

        {/* Dashboard Widgets */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
            {dashboardData.widgets
              .sort((a, b) => a.position.order - b.position.order)
              .map(renderWidget)}
          </div>
        )}

        {/* Empty State */}
        {!dashboardData?.widgets?.length && !dashboardLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No widgets configured</h3>
                <p className="text-muted-foreground mb-4">
                  Add widgets to your dashboard to start viewing analytics data.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Widget
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

