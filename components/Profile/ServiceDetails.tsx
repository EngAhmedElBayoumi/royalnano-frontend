interface Service {
  title: string;
  warranty: string;
  country: string;
  description: string;
  status: "waiting" | "completed" | "canceled";
}

const ServiceDetails = ({ params }: { params: { title: string } }) => {
  const services: Service[] = [
    {
      title: "daimond-hypred",
      warranty: "5 Years",
      country: "USA",
      description: "Details about Daimond Hypred",
      status: "completed",
    },
    {
      title: "service-2",
      warranty: "2 Years",
      country: "Country 2",
      description: "Details about Service 2",
      status: "waiting",
    },
  ];

  const fetchedService = services.find((s) => s.title === params.title);

  return (
    <>
      {fetchedService ? (
        <section className="mt-8 flex justify-center">
          <main className="main-container">
            {/* Status Section */}
            <ul className="flex justify-center gap-16 mb-4">
              <li
                className={`flex flex-col items-center gap-2 text-[30px] ${
                  fetchedService.status === "waiting"
                    ? "text-primary"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-20 h-20 border-4 ${
                    fetchedService.status === "waiting"
                      ? "border-primary"
                      : "border-gray"
                  } text-lg`}
                >
                  1
                </span>
                waiting
              </li>
              <li
                className={`flex flex-col items-center gap-2 text-[30px] ${
                  fetchedService.status === "completed"
                    ? "text-green-600"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-20 h-20 border-4 ${
                    fetchedService.status === "completed"
                      ? "border-green-600"
                      : "border-gray"
                  } text-lg`}
                >
                  2
                </span>
                Completed
              </li>
              <li
                className={`flex flex-col items-center gap-2 text-[30px] ${
                  fetchedService.status === "canceled"
                    ? "text-red-600"
                    : "text-gray"
                }`}
              >
                <span
                  className={`rounded-full flex justify-center items-center w-20 h-20 border-4 ${
                    fetchedService.status === "canceled"
                      ? "border-red-600"
                      : "border-gray"
                  } text-lg`}
                >
                  3
                </span>
                cancelled
              </li>
            </ul>

            {/* Top Section */}
            <header className="flex justify-center gap-1 py-1 text-gray-100 text-md font-[500]">
              <h3 className="flex justify-between w-full text-white items-center px-4 bg-primary rounded-l-lg w-1/2">
                Service Type:<span>{fetchedService.title}</span>
              </h3>
              <h3 className="flex justify-between w-full text-white items-center px-4 bg-primary rounded-r-lg w-1/2">
                Branch:<span>October</span>
              </h3>
            </header>

            {/* Bottom Section */}
            <header className="flex justify-center gap-1 py-1 text-primary text-md font-[500]">
              <h3 className="flex justify-between w-full bg-[#dfdedb] rounded-l-md w-1/2 items-center px-4">
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
                className="text-primary font-[500] bg-white border-2 border-primary rounded-md px-5 py-2 text-md flex justify-center items-center hover:bg-primary hover:text-white transition"
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
