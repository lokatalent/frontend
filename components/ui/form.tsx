"use client";

// import Image from "next/image";
// import Link from "next/link";
import { usePathname } from "next/navigation";

// import dpEmpty from "../../public/Images/dp-empty.png";

interface DataItem {
	label: string;
	error: string;
	type: string;
	isImportant: boolean;
	selection: boolean;
	width: string;
}

type FormProps = {
	dataInput: DataItem[];
	isFormValid: boolean;
	children: any;
};
// function Selection({ width }) {
// 	return (
// 		<div className="flex gap-2 ">
// 			<div className="relative inline-block">
// 				<select
// 					id="component-select"
// 					className={`appearance-none  ${width} bg-white h-[3rem]  rounded px-[1rem]`} // w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[25rem]
// 				>
// 					<option
// 						value=""
// 						selected
// 					></option>
// 					<option
// 						value=""
// 						className="bg-[#3377FF21] hover:text-navBlue flex w-full cursor-default select-none bold items-center rounded- py-1.5 pl-2 pr-8 text-sm"
// 					>
// 						Student
// 					</option>
// 					<option
// 						value=""
// 						className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px] flex items-center h-[35px]"
// 					>
// 						Teacher
// 					</option>
// 				</select>

// 				<div className="pointer-events-none absolute top-1/2 right-2 transform -translate-y-1/2">
// 					<div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-black"></div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

const Form: React.FC<FormProps> = ({ children }) => {
	const pathname = usePathname();


	return (
		<div className="sm:px-[4rem]  md:px-[6rem] lg:px-[7rem] py-12 flex justify-cnter flex-col items-cener gap-12 ">
			<div className="flex gap-4 items-center flex-col justify-center">
				{children}

				{/* <form className="flex flex-row flex-wrap justify-center">
          <div className="flex flex-wrap items-center justify-center gap-10">
            {dataInput.map((data: DataItem, index: number) => (
              <div className="flex flex-col gap-[0.5rem]" key={index}>
                <label>
                  {data.label}
                  <span className="text-sm">
                    {data.isImportant ? "*" : "  (optional)"}
                  </span>
                </label>
                {!data.selection ? (
                  <>
                    {data.type === "input" && (
                      <input
                        type={data.type}
                        className={`${data.width} bg-white h-[3rem] text-[#3377FF] rounded px-[1rem]`}
                      />
                    )}
                    {data.type === "file" && (
                      <div
                        className={`${data.width} bg-white text-[#3377FF] rounded px-[1rem] flex items-center justify-content flex-col`}
                      >
                        <div>
                          <Image
                            src={fileUpload}
                            alt="File Upload"
                            className="w-10"
                          />
                        </div>
                        <p className="text-[11px] text-[#CD1B78]">
                          Click to upload{" "}
                          <span className="text-black">or drag and drop</span>
                        </p>
                        <p className="text-[11px] text-black">
                          SVG, HEIC, PNG, JPG
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <Selection width={data.width} />
                )}
                {!isFormValid ? (
                  <div className="text-[10px] text-[#FFB82E]">{data.error}</div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </form> */}
			</div>
			{/* <div className="flex justify-center">
        <Link
          href={`${pathname}/email-verification`}
          className="font-nunito text-xl text-[#fff] bg-[#3377FF] font-normal leading-6 w-[20rem] sm:w-[30rem] md:w-[32rem] lg:w-[35rem] rounded h-12 flex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
        >
          Next
        </Link>
      </div> */}
		</div>
	);
};

export default Form;
