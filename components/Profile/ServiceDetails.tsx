import { services } from "@/data/profileServices";

const ServiceDetails = ({ params }: { params: { id: string } }) => {
  const fetchedService = services.find((s) => s.id === Number(params.id));

  return (
    <>
      {fetchedService ? (
        <section className="mt-8 flex justify-center">
          <main className="main-container">
            {/* Status Section */}
            <ul className="flex justify-center gap-10 xl:gap-16 mb-4">
              <li
                className={`flex flex-col items-center gap-2 text-sm lg:text-md xl:text-lg ${
                  fetchedService.status === "waiting"
                    ? "text-primary"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-[60px] h-[60px] xl:w-20 xl:h-20 border-4 ${
                    fetchedService.status === "waiting"
                      ? "border-primary"
                      : "border-gray"
                  } text-lg xl:text-xl`}
                >
                  1
                </span>
                waiting
              </li>
              <li
                className={`flex flex-col items-center gap-2 text-sm lg:text-md xl:text-lg ${
                  fetchedService.status === "completed"
                    ? "text-green-600"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-[60px] h-[60px] xl:w-20 xl:h-20 border-4 ${
                    fetchedService.status === "completed"
                      ? "border-green-600"
                      : "border-gray"
                  } text-lg xl:text-xl`}
                >
                  2
                </span>
                Completed
              </li>
              <li
                className={`flex flex-col items-center gap-2 text-sm lg:text-md xl:text-lg ${
                  fetchedService.status === "canceled"
                    ? "text-red-600"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-[60px] h-[60px] xl:w-20 xl:h-20 border-4 ${
                    fetchedService.status === "canceled"
                      ? "border-red-600"
                      : "border-gray"
                  } text-lg xl:text-xl`}
                >
                  3
                </span>
                cancelled
              </li>
            </ul>

            {/* Top Section */}
            <header className="flex justify-center gap-1 py-1 text-gray-100 md:text-sm xl:text-md font-[500]">
              <h3 className="flex justify-between w-full py-1 xl:py-0 text-white items-center px-4 bg-primary rounded-l-lg w-1/2">
                Service Type:<span>{fetchedService.title}</span>
              </h3>
              <h3 className="flex justify-between w-full text-white items-center px-4 bg-primary rounded-r-lg w-1/2">
                Branch:<span>October</span>
              </h3>
            </header>

            {/* Bottom Section */}
            <header className="flex justify-center gap-1 py-1 text-primary md:text-sm xl:text-md font-[500]">
              <h3 className="flex justify-between w-full py-1 xl:py-0 bg-[#dfdedb] rounded-l-md w-1/2 items-center px-4">
                Price:<span>20000L.E</span>
              </h3>
              <h3 className="flex justify-between w-full bg-[#dfdedb] rounded-r-md w-1/2 items-center px-4">
                Payment method:<span>cash</span>
              </h3>
            </header>

            {/* Button Section */}
            <div className="flex justify-center mt-8">
              <a
                href="#download"
                className="text-primary font-[500] bg-white border-2 border-primary rounded-md px-5 xl:py-2 md:text-sm xl:text-md flex justify-center items-center hover:bg-primary hover:text-white transition"
              >
                Download Pdf
              </a>
            </div>
          </main>
        </section>
      ) : (
        <h1>Service not found</h1>
      )}
    </>
  );
};

export default ServiceDetails;
