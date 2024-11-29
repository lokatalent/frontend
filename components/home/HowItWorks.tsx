import Image from "next/image";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search for a Service",
      info: "Browse a wide range of services available near you. Simply search for what you need, from cleaning to driving and more",
      icon: true,
    },
    {
      id: 2,
      title: "Select Location and Add Booking Details",
      info: "Choose your preferred location and provide the necessary booking details to customize your service to your needs",

      icon: true,
    },
    {
      id: 3,
      title: "Select a Talent",
      info: "Choose from a list of trusted service providers based on your preferences and needs",

      icon: false,
    },
    {
      id: 4,
      title: "Make Payment",
      info: "Securely complete your payment to confirm your booking and get ready for your services",

      icon: false,
    },
  ];
  return (
    <div className="contained px-5">
      <h2 className="sub-heading">How it works</h2>
      <div className=" flex items-center justify-center pb-14">
        <div className="contain flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 items-center  justify-center ">
          <div className=" w-full flex justify-center">
            <Image
              src="/Images/works.png"
              width={478}
              height={200}
              alt="lady holding a phone"
            />
          </div>
          <div className="w-full flex flex-col  justify-center">
            <div className="w-[95%] md:w-full mx-auto">
              {steps.map((step) => (
                <div key={step.id} className="pb-8">
                  <div className="flex space-x-3">
                    <p className="shrink-0 rounded-full bg-primaryBlue h-6 w-6  text-white flex items-center justify-center">
                      {step.id}
                    </p>

                    <div>
                      <p className=" font-semibold">{step.title}</p>
                      <p>{step.info} </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[80%] mx-auto md:w-full">
              <button className="bg-primaryBlue hover:bg-blue-700 text-white w-full md:w-[339px] py-5 px-8 ">
                Make a Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
