import FlexibleServices from "@/components/FlexibleServices";
import OurServices from "@/components/services/OurServices";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import About from "@/components/about/About";
import OurSolutions from "@/components/ourSolutions/OurSolutions";
import Subscription from "@/components/Subscription";

export default function Home() {
  return (
    <>
      <OurServices />
      <FlexibleServices />
      <About />
      <OurSolutions />
      <CustomerReviews />
      <Subscription />
    </>
  );
}
