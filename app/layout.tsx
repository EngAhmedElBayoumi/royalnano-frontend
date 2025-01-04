"use client";

// import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true); // Mark the component as rendered on the client-side
  // }, []);

  // useEffect(() => {
  //   if (isClient) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             entry.target.classList.add("slide-in");
  //           }
  //         });
  //       },
  //       { threshold: 0.5 }
  //     );

  //     const elements = document.querySelectorAll(".animate-on-scroll");

  //     elements.forEach((element) => {
  //       observer.observe(element);
  //     });

  //     return () => {
  //       elements.forEach((element) => {
  //         observer.unobserve(element);
  //       });
  //     };
  //   }
  // }, [isClient]);

  // if (!isClient) {
  //   return null; // Optionally return a loading or empty component during SSR
  // }

  return <Provider store={store}>{children}</Provider>;
}
