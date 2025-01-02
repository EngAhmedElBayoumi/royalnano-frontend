"use client";
import "./globals.css";
// import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// export const metadata = {
//   title: "Royal Nano",
//   description: "Royal Nano Erp",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
