import { Cairo } from "next/font/google";
import "../globals.css";
import Head from "next/head";

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
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={cairo.className}>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
