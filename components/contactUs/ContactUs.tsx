import React from "react";
import MapComponent from "../map/Map";
import ContactForm from "../forms/ContactForm";

const ContactUs = () => {
  return (
    <section className="py-8 bg-white ">
      <h2 className="text-center text-lg font-bold text-primary">Contact Us</h2>
      <div className="flex gap-11 justify-center">
        <main className="main-container gap-2 grid grid-cols-1 md:grid-cols-2 items-center ">
          <ContactForm />
          <MapComponent />
        </main>
      </div>
    </section>
  );
};

export default ContactUs;
