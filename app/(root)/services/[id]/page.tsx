import ServiceDetails from "@/components/Profile/ServiceDetails";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceDetails | Royal Nano",
  description: "Service Details page",
};

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>;
}

// generateStaticParams tells Next.js to pre-render pages for the specified parameters.
// This avoids Vercel treating the route as "not found."
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

const ServiceDetailsPage = async ({ params }: ServiceDetailsPageProps) => {
  const resolvedParams = await params; // Resolve the Promise
  return (
    <>
      <PageHeader title="Service Details" />
      <div className="relative top-[-160px]">
        <ServiceDetails params={resolvedParams} />
      </div>
    </>
  );
};

export default ServiceDetailsPage;

export const dynamic = "force-dynamic";
