import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/MainNavbar";

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
    <>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
