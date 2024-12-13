import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //test
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
