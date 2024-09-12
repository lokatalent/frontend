const Testimonial = () => {
	return (
		<div className="contained py-14">
			<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold py-14 leading-10">
				What Customers Say <br /> About Us
			</h1>

			<div className="bg-primaryBlue rounded-lg p-12 flex flex-col md:flex-row  ">
				<div className="basis-1/2 md:pr-4">
					<div className="text-white ">
						<p className="text-2xl md:text-3xl lg:text-4xl font-bold pb-7 text-center md:text-start">
							Ready to Lorem ipsum lorem ip
						</p>
						<p className="text-base font-normal ">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras
							consectetur adipiscing commodo euismod condimentum nunc. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit.Cras consectetur
							adipiscing commodo euismod condimentum nunc.Lorem ipsum dolor sit
							amet, consectetur adipiscing elit.Cras consectetur adipiscing
							commodo euismod condimentum nunc.Lorem ipsum dolor sit amet,
							consectetur adipiscing elit.Cras consectetur adipiscing commodo
							euismod condimentum nunc.
						</p>
					</div>
				</div>
				<div className=" flex flex-col pt-3 md:pt-0 md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-center justify-center  basis-1/2">
					<div className=" w-full ">
						<button className="bg-white w-full md:w-[241px] text-primaryBlue  py-5 px-8">
							Sign up
						</button>
					</div>

					<div className="w-full ">
						<button className="border border-white w-full  md:w-[241px] hover:bg-blue-700 text-white    py-5 px-8">
							Apply as a Talent
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
