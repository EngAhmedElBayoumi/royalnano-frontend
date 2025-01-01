import Image from "next/image";

const Difference = () => {
  return (
    <>
      <h2 className="text-center text-lg font-bold text-primary">
        See The Difference
      </h2>
      <div className="flex justify-center">
        <section className="main-container flex justify-center items-center w-full">
          <div className="flex px-2 ml-2">
            <figure>
              <Image
                src="/assets/images/car.png"
                alt="Car 1"
                width={500}
                height={300}
              />
              <figcaption>Car 1</figcaption>
            </figure>
            <figure>
              <Image
                src="/assets/images/car2.png"
                alt="Car 2"
                width={500}
                height={300}
              />
              <figcaption>Car 2</figcaption>
            </figure>
          </div>

          <div className="flex px-15">
            <figure>
              <Image
                src="/assets/images/car.png"
                alt="Car 1"
                width={500}
                height={300}
              />
              <figcaption>Car 1</figcaption>
            </figure>
            <figure>
              <Image
                src="/assets/images/car2.png"
                alt="Car 2"
                width={500}
                height={300}
              />
              <figcaption>Car 2</figcaption>
            </figure>
          </div>

          <div className="flex">
            <figure>
              <Image
                src="/assets/images/car.png"
                alt="Car 1"
                width={500}
                height={300}
              />
              <figcaption>Car 1</figcaption>
            </figure>
            <figure>
              <Image
                src="/assets/images/car2.png"
                alt="Car 2"
                width={500}
                height={300}
              />
              <figcaption>Car 2</figcaption>
            </figure>
          </div>
        </section>
      </div>
    </>
  );
};

export default Difference;
