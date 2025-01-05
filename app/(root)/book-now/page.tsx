import BookingForm from "@/components/forms/BookingForm";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Book Now | Royal Nano",
  description: "booking form",
};
export default function Page() {
  return (
    <>
      <PageHeader title="book now" />
      <div className="relative top-[-100px]">
        <BookingForm />
      </div>
    </>
  );
}
