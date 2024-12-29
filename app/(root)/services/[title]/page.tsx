import ServiceDetails from "@/components/Profile/ServiceDetails";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "ServiceDetails | Royal Nano",
  description: "Service Details page",
};
export default function ServiceDetailsPage({
  params,
}: {
  params: { title: string };
}) {
  return (
    <>
      <PageHeader title="service details" />
      <div className="relative top-[-160px]">
        <ServiceDetails params={params} />
      </div>
    </>
  );
}
