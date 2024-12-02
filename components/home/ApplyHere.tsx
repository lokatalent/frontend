const ApplyHere = () => {
  return (
    <div className="bg-design-home py-16 md:py-24 md:px-14 bg-primaryBlue">
      <div className="flex flex-col xl:flex-row xl:justify-center xl:items-center gap-5 lg:gap-10 px-5 md:px-10">
        <div className="text-white md:basis-2/3">
          <p className="text-center text-3xl md:text-4xl lg:text-6xl font-medium pb-7 xl:text-left">
            Want to work as a service provider?
          </p>
          <p className="text-center xl:text-left text-base font-normal ">
            Join our platform as a service provider and start earning income by
            offering your skills to a wide range of customers. Sign up today to
            get started!
          </p>
        </div>
        <div className="flex justify-center xl:w-full xl:max-w-sm">
          <button className="bg-white text-primaryBlue xl:w-full py-5 px-8 mt-10">
            Apply Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyHere;
