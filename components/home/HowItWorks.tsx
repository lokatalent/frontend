import Image from "next/image";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Lorem Ipsum",
      info: " Lorem Lorem LoremLoremLorem LoremLoremLorem LoremLoremLoremLoremLoremLoremLorem",
      icon: true,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      info: " Lorem Lorem LoremLoremLorem LoremLoremLorem LoremLoremLoremLoremLoremLoremLorem",

      icon: true,
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      info: " Lorem Lorem LoremLoremLorem LoremLoremLorem LoremLoremLoremLoremLoremLoremLorem",

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
                <div key={step.id} className="pb-12">
                  <div className="flex space-x-3">
                    <p className=" rounded-full bg-primaryBlue h-6 w-12  text-white flex items-center justify-center">
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
