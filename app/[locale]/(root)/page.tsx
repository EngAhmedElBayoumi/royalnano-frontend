import Hero from "@/components/Hero";
import FlexibleServices from "@/components/FlexibleServices";
import OurServices from "@/components/services/OurServices";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import About from "@/components/about/About";
import OurSolutions from "@/components/ourSolutions/OurSolutions";
import Subscription from "@/components/Subscription";
import ContactUs from "@/components/contactUs/ContactUs";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
export default function Home() {
  const t = useTranslations('HomePage');
  
  return (
    <>
    <div className="p-20">

      <h1 className="text-black p-4">{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>

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
