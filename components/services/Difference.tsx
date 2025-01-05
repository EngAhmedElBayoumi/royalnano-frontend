import Image from "next/image";

const Difference = () => {
  return (
    <section className="pb-8 bg-white relative top-[-100px]">
      <h2 className="text-center text-md lg:text-lg xl:text-xl font-bold text-primary mb-3">
        See The Difference
      </h2>
      <div className="flex justify-center">
        <main className="main-container grid md:grid-cols-3 gap-2 md:gap-[3rem]">
          <div className="flex rounded-10 overflow-hidden">
            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car.png"
              alt="Car 1"
              width={200}
              height={220}
            />

            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car2.png"
              alt="Car 2"
              width={200}
              height={220}
            />
          </div>

          <div className="flex rounded-10 overflow-hidden">
            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car.png"
              alt="Car 1"
              width={200}
              height={220}
            />

            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car2.png"
              alt="Car 2"
              width={200}
              height={220}
            />
          </div>

          <div className="flex rounded-10 overflow-hidden">
            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car.png"
              alt="Car 1"
              width={200}
              height={220}
            />

            <Image
              className="w-1/2 h-[220px] object-cover h-[200px]"
              src="/assets/images/car2.png"
              alt="Car 2"
              width={200}
              height={220}
            />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Difference;
