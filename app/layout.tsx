"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ToastProvider from "@/components/toastProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
          }
        });
      },
      { threshold: 0.5 }
    );

    // Select all elements you want to animate on scroll
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on unmount
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
