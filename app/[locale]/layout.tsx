import { Cairo } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ReduxProvider from "@/components/ReduxProvider";
import ScrollAnimation from "@/components/provider";

const cairo = Cairo({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const { locale } = await Promise.resolve(params);

  if (!locale || !(locale === "ar" || locale === "en")) {
    return <p>Invalid locale</p>;
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cairo.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
            {children}
            <ScrollAnimation />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;
