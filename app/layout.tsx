import { Cairo } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

const cairo = Cairo({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
