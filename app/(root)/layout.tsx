import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Cairo } from "next/font/google";

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
