const ApplyHere = () => {
	return (
		<div className="bg-design-home py-16  md:py-24 md:px-14 bg-primaryBlue">
			<div className="contained flex flex-col md:flex-row justify-center items-center space-y-7 md:space-y-0  space-x-0  md:space-x-14 ">
				<div className="text-white md:basis-2/3">
					<p className="text-3xl md:text-4xl lg:text-6xl font-bold pb-7 text-start">
						Want to work as a service provider ?
					</p>
					<p className="text-base font-normal ">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras
						consectetur adipiscing commodo euismod condimentum nunc.
					</p>
				</div>
				<div className="md:basis-1/2">
					<button className="bg-white text-primaryBlue w-full lg:w-6/12 py-5 px-8 ">
						Apply Here
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApplyHere;
