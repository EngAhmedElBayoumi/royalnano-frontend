import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Cairo } from "next/font/google";
import "../globals.css";

const cairo = Cairo({ subsets: ["latin"] }); // Initialize Cairo font

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
