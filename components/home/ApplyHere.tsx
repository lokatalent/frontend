const ApplyHere = () => {
  return (
    <div className="bg-design-home py-16  md:py-24 md:px-14 bg-primaryBlue">
      <div className="contained flex flex-col md:flex-row justify-center md:items-center space-y-7 md:space-y-0  space-x-0  md:space-x-20 ">
        <div className="text-white md:basis-2/3">
          <p className="text-3xl md:text-4xl lg:text-6xl font-medium pb-7 text-start">
            Want to work as a service provider ?
          </p>
          <p className="text-base font-normal ">
            Join our platform as a service provider and start earning income by
            offering your skills to a wide range of customers. Sign up today to
            get started!
          </p>
        </div>
        <div className="">
          <button className="bg-white text-primaryBlue w-full  md:w-[339px] py-5 px-8 ">
            Apply Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyHere;
