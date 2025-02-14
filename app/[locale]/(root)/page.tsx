import Hero from "@/components/Hero";
import FlexibleServices from "@/components/FlexibleServices";
import OurServices from "@/components/services/OurServices";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import About from "@/components/about/About";
import OurSolutions from "@/components/ourSolutions/OurSolutions";
import Subscription from "@/components/Subscription";
import ContactUs from "@/components/contactUs/ContactUs";

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <FlexibleServices />
      <About showTitle={true} />
      <OurSolutions />
      <CustomerReviews />
      <ContactUs />
      <Subscription />
    </>
  );
}
