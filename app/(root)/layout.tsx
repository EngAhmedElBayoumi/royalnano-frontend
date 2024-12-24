import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/MainNavbar";
import { Cairo } from "next/font/google";
import "../globals.css";
import Head from "next/head";

const cairo = Cairo({ subsets: ["latin"] }); // Initialize Cairo font

export const metadata = {
  title: "Royal Nano",
  description: "Royal Nano Erp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={cairo.className}>
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
