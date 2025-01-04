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
    if (typeof window !== "undefined") {
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

      const elements = document.querySelectorAll(".animate-on-scroll");

      elements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
