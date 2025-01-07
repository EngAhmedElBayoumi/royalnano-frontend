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
