import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/MainNavbar";
import { Cairo } from "next/font/google";
import "../globals.css";

const cairo = Cairo({ subsets: ["latin"] });

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
      <body className={cairo.className}>
        <Navbar />
        <main className="main ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
