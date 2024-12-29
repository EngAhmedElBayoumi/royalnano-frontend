import BookingForm from "@/components/forms/BookingForm";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Book Now | Royal Nano",
  description: "booking form",
};
export default function Page() {
  return (
    <>
      <Hero />
      <div className="relative top-[-100px]">
        <BookingForm />
        {/* <About />
        <OurSolutions />
        <CustomerReviews /> */}
      </div>
    </>
  );
}
