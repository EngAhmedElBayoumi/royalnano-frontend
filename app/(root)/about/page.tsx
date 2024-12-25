import CustomerReviews from "@/components/reviews/CustomerReviews";
import About from "@/components/about/About";
import OurSolutions from "@/components/ourSolutions/OurSolutions";
import Hero from "@/components/Hero";

export const metadata = {
  title: "About Us | Royal Nano",
  description: "Learn more about our Royal Nano and team.",
};
export default function AboutPage() {
  return (
    <>
      <Hero />
      <About />
      <OurSolutions />
      <CustomerReviews />
    </>
  );
}
