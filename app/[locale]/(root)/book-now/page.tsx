
import BookingForm from "@/components/forms/BookingForm";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Book Now | Royal Nano",
  description: "booking form",
};
export default function Page({params}:{params?:{locale:string}}) {
  const locale = params?.locale ?? "en"; 
console.log(locale)
  return (
    <>
      <PageHeader title="book now" />
      <div className="relative top-[-100px]">
        <BookingForm locale={locale} />
      </div>
    </>
  );
}
