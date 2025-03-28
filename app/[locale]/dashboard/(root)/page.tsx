"use client";
import InfoCardsComponent from "@/components/dashboard/cards/InfoCard";
import { AreaChartComponent } from "@/components/dashboard/charts/AreaChartComponent";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import { useGetStatisticsQuery } from "@/redux/services/dashboard/statisticsApi";

export default function Home() {
  const { data, isLoading, error } = useGetStatisticsQuery({});

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

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/sidebar/home.svg"
          title="home"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {error ? (
          <LoadingError />
        ) : isLoading ? (
          <CardsSkelton />
        ) : (
          <>
            <InfoCardsComponent data={cardsData} />
            <div className="mt-10 flex flex-col items-start justify-center gap-5">
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
                // containerStyle={{
                //   width: "100%",
                //   maxWidth: "600px", // Set a maximum width for the chart container
                //   height: "400px", // Set a fixed height for the chart container
                //   margin: "0 auto", // Center the chart horizontally
                // }}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
