import CustomButton from "./formFields/CustomButton";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[580px] text-white flex justify-center top-[-160px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, rgba(0, 0, 0, 0.77) 100%), url('/assets/images/race-car.png')",
      }}
    >
      <main className="main-container flex flex-col justify-center items-start">
        <h2 className="mt-16 text-sm sm:text-md lg:text-lg">
          Royal Nano Ceramic
        </h2>
        <p className="md:text-sm lg:text-md max-w-[800px]">
          Royal Nano Ceramic is a leading car protection company in Egypt,
          offering advanced nano ceramic coatings to protect and enhance vehicle
          exteriors. They specialize in paint protection, scratch resistance,
          and hydrophobic coatings, ensuring cars remain in top condition
        </p>
        <CustomButton
          text="Protect Your Car"
          className="text-white mt-4 rounded-2xl text-[14px] sm:text-sm lg:text-md px-6"
        />
      </main>
    </section>
  );
};

export default Hero;
