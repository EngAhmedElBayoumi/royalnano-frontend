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
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
