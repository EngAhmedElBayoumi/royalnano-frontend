import ServiceDetails from "@/components/Profile/ServiceDetails";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "ServiceDetails | Royal Nano",
  description: "Service Details page",
};
interface serviceDetailsProps {
  params: { id: string };
}
const ServiceDetailsPage: React.FC<serviceDetailsProps> = ({ params }) => {
  const resolvedParams = params;
  return (
    <>
      <PageHeader title="service details" />
      <div className="relative top-[-160px]">
        <ServiceDetails params={resolvedParams} />
      </div>
    </>
  );
};

export default ServiceDetailsPage;
