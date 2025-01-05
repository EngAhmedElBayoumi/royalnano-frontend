import ServiceDetails from "@/components/Profile/ServiceDetails";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "ServiceDetails | Royal Nano",
  description: "Service Details page",
};
export default async function ServiceDetailsPage({
  params,
}: {
  params: { title: string };
}) {
  const resolvedParams = await params;
  return (
    <>
      <PageHeader title="service details" />
      <div className="relative top-[-160px]">
        <ServiceDetails params={resolvedParams} />
      </div>
    </>
  );
}
