"use client"; 

import { useEffect } from "react";

const ScrollAnimation = () => {
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

    // Select all elements with the class "animate-on-scroll"
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
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollAnimation;