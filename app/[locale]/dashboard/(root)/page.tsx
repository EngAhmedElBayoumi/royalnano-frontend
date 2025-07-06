"use client";
import InfoCardsComponent from "@/components/dashboard/cards/InfoCard";
import { AreaChartComponent } from "@/components/dashboard/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/dashboard/charts/BarChartComponent";
import { PieChartComponent } from "@/components/dashboard/charts/PieChartComponent";
import { LineChartComponent } from "@/components/dashboard/charts/LineChartComponent";
import { KPICard } from "@/components/dashboard/charts/KPICard";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import { useGetStatisticsQuery } from "@/redux/services/dashboard/statisticsApi";
import { useGetKPIsQuery } from "@/redux/services/analytics/analyticsApi";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useGetStatisticsQuery({});
  const { data: kpiData, isLoading: kpiLoading } = useGetKPIsQuery({
    filters: { period: 'last_30_days' }
  });

  // Prepare cards data
  const cardsData = data
    ? Object.entries(data)
        .filter(([, value]) => typeof value === "number") // Only include keys with numeric values
        .map(([key, value]) => ({
          title: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()), // Format the key to a readable title
          num: value as number, // Explicitly cast value to number
        }))
    : [];

  // Prepare chart data
  const chartData =
    data?.labels?.map((label: string, index: number) => ({
      date: label,
      sales: data.sales_data[index] ?? 0,
      purchases: data.purchases_data[index] ?? 0,
    })) ?? [];

  // Determine date range dynamically
  const dateRange =
    data?.labels && data.labels.length > 0
      ? `${data.labels[0]} to ${data.labels[data.labels.length - 1]}`
      : "No data available";

  // Use real data from APIs instead of mock data
  const analyticsDataFromAPI = {
    total_revenue: kpiData?.sales_total?.value || data?.total_sales || 0,
    revenue_change: kpiData?.sales_total?.change_percentage || 0,
    active_customers: kpiData?.customers_count?.value || data?.total_customers || 0,
    customer_change: kpiData?.customers_count?.change_percentage || 0,
    monthly_orders: kpiData?.orders_count?.value || data?.total_sales_invoices || 0,
    orders_change: kpiData?.orders_count?.change_percentage || 0,
    inventory_value: kpiData?.inventory_value?.value || data?.total_items || 0,
    inventory_change: kpiData?.inventory_value?.change_percentage || 0,
  };

  // Prepare analytics data for charts based on real data
  const departmentData = data?.branch_performance ? 
    data.branch_performance.map((branch: any, index: number) => ({
      name: branch.name || `Branch ${index + 1}`,
      value: branch.performance_score || branch.sales_total || 0,
      employees: branch.employee_count || 0,
    })) : [
      { name: "Main Branch", value: data?.total_sales || 0, employees: data?.total_employees || 0 },
    ];

  const monthlyTrendsData = data?.labels ? 
    data.labels.map((label: string, index: number) => ({
      month: label,
      revenue: data.sales_data?.[index] || 0,
      expenses: data.purchases_data?.[index] || 0,
      profit: (data.sales_data?.[index] || 0) - (data.purchases_data?.[index] || 0),
    })) : [];

  // Use services data instead of products (since this is a service-based business)
  const topServicesData = data?.top_services ? 
    data.top_services.map((service: any) => ({
      name: service.name,
      sales: service.total_revenue || 0,
      quantity: service.usage_count || 0,
    })) : [
      { name: "Service A", sales: data?.total_sales * 0.3 || 0, quantity: 50 },
      { name: "Service B", sales: data?.total_sales * 0.25 || 0, quantity: 40 },
      { name: "Service C", sales: data?.total_sales * 0.2 || 0, quantity: 30 },
      { name: "Service D", sales: data?.total_sales * 0.15 || 0, quantity: 25 },
      { name: "Service E", sales: data?.total_sales * 0.1 || 0, quantity: 20 },
    ];

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/sidebar/home.svg"
          title="home"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <CardsSkelton />
        ) : (
          <>
            <InfoCardsComponent data={cardsData} />
            
            {/* KPI Cards Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiLoading ? (
                // Loading skeleton for KPI cards
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-32 rounded-lg"></div>
                  </div>
                ))
              ) : kpiData && Array.isArray(kpiData) ? (
                kpiData.slice(0, 4).map((kpi, index) => (
                  <KPICard
                    key={index}
                    title={kpi.name}
                    value={kpi.format_type === 'currency' ? `$${kpi.value.toLocaleString()}` : kpi.value.toLocaleString()}
                    change={kpi.change_percentage || 0}
                    icon={kpi.icon || "TrendingUp"}
                  />
                ))
              ) : (
                // Fallback KPI cards using analytics data
                <>
                  <KPICard
                    title="Total Revenue"
                    value={analyticsDataFromAPI.total_revenue}
                    change={analyticsDataFromAPI.revenue_change}
                    icon="DollarSign"
                  />
                  <KPICard
                    title="Active Customers"
                    value={analyticsDataFromAPI.active_customers}
                    change={analyticsDataFromAPI.customer_change}
                    icon="Users"
                  />
                  <KPICard
                    title="Monthly Orders"
                    value={analyticsDataFromAPI.monthly_orders}
                    change={analyticsDataFromAPI.orders_change}
                    icon="ShoppingCart"
                  />
                  <KPICard
                    title="Inventory Value"
                    value={analyticsDataFromAPI.inventory_value}
                    change={analyticsDataFromAPI.inventory_change}
                    icon="Package"
                  />
                </>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Sales and Purchases Chart */}
              <AreaChartComponent
                chartData={chartData}
                title="Sales and Purchases"
                description={`A comparison of sales and purchases from ${dateRange}`}
                footerData={{
                  text: "Overview",
                  subText: `Data range: ${dateRange}`,
                }}
                config={{
                  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
                  purchases: {
                    label: "Purchases",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                xKey="date"
                yKeys={["sales", "purchases"]}
              />

              {/* Department/Branch Performance Pie Chart */}
              <PieChartComponent
                chartData={departmentData}
                title="Branch Performance"
                description="Performance by branch location"
                footerData={{
                  text: "Performance",
                  subText: "Based on sales and employee metrics",
                }}
                config={{
                  value: { label: "Performance Score" },
                }}
                nameKey="name"
                dataKey="value"
              />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trends Line Chart */}
              <LineChartComponent
                chartData={monthlyTrendsData}
                title="Monthly Financial Trends"
                description="Revenue, expenses, and profit trends over time"
                footerData={{
                  text: "Trends",
                  subText: "Monthly financial performance",
                }}
                config={{
                  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
                  profit: { label: "Profit", color: "hsl(var(--chart-3))" },
                }}
                xKey="month"
                yKeys={["revenue", "expenses", "profit"]}
              />

              {/* Top Services Bar Chart */}
              <BarChartComponent
                chartData={topServicesData}
                title="Top Services"
                description="Best performing services by usage and revenue"
                footerData={{
                  text: "Services",
                  subText: "Top performers this period",
                }}
                config={{
                  sales: { label: "Revenue", color: "hsl(var(--chart-1))" },
                  quantity: { label: "Usage Count", color: "hsl(var(--chart-2))" },
                }}
                xKey="name"
                yKeys={["sales", "quantity"]}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
