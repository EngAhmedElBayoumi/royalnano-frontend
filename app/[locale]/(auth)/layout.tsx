export const metadata = {
  title: "Royal Nano",
  description: "Royal Nano Erp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="main">{children}</main>;
}
