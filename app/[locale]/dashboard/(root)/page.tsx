"use client";
import InfoCardsComponent from "@/components/dashboard/cards/InfoCard";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import LoadingError from "@/components/dashboard/LoadingError";
import CardsSkelton from "@/components/dashboard/skelton/CardsSkelton";
import { useGetStatisticsQuery } from "@/redux/services/dashboard/statisticsApi";

export default function Home() {
  const { data, isLoading, error } = useGetStatisticsQuery({});
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
          </>
        )}
      </div>
    </main>
  );
}
