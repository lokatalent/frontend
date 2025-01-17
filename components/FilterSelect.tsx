import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectItem,
	SelectGroup,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { IoClose } from "react-icons/io5";


export type BookingType = {
	name: string;
	options: string[];
};


function FilterSelect({filterType}) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	//   const [checkSeen, setCheckSeen] = useState<boolean>([]);

	// Helper function to handle selecting values
	const handleValueChange = (value: string, filterArray: string[]) => {
    console.log("Filter array:", filterArray);
    console.log(value)

    setSelectedOptions((prevSelectedOptions) => {
      let newSelectedOptions = [...prevSelectedOptions];

      // Apply the logic from processArrays to update the arrays
      const processArrays = (
        oldArray: string[],
        newArray: string[],
        newValue: string
      ) => {
        let found = false;

        oldArray.forEach((item: string) => {
          const index = newArray.indexOf(item);
          if (index !== -1) {
            newArray.splice(index, 1);
            newArray.push(newValue);
            //   setCheckSeen(true)
            console.log("check true");
            console.log(`Removed ${item} from newArray and added ${newValue}`);
            found = true;
          }
        });

        if (!found) {
          // setCheckSeen(false);
          newArray.push(newValue);
          console.log("check false  ");

          console.log(`No matching item found. Added ${newValue} to newArray.`);
        }

        return newArray;
      };

      // Process the arrays, using the current selected options and the filterArray
      newSelectedOptions = processArrays(
        filterArray,
        newSelectedOptions,
        value
      );
      checkHandler(value, filterArray)

      return newSelectedOptions;
    });
  };


	// Helper function to remove an option from selectedOptions
	const handleRemoveOption = (value: string) => {
		setSelectedOptions((prevSelectedOptions) => {
			return prevSelectedOptions.filter((option) => option !== value);
		});
	};

	return (
		<div className="w-full gap-6 flex flex-col gap-[2rem]">
			{/* Applied Filters Section */}
			<div>
				<div className="flex justify-between items-center">
					<p>Applied filters</p>
					<Button
						variant="ghost"
						className="text-primaryBlue"
						onClick={() => setSelectedOptions([])}
					>
						Reset
					</Button>
				</div>
				<div className="flex items-center gap-3 flex-wrap">
					{selectedOptions.map((name, index) => (
						<Button
							key={index}
							className="bg-primaryBlue px-3 py-3 text-white rounded-sm flex items-center gap-3 self-center w-max"
							onClick={() => handleRemoveOption(name)}
						>
							{name}
							<IoClose color="white" />
						</Button>
					))}
				</div>
			</div>

			{/* Filters Section */}
			<div>
				{filterType.map((select, index) => (
					<div
						className="flex justify-between items-center w-full text-left"
						key={index}
					>
						<div>
							<input type="checkbox" />
							<span className="text-gray-700 ml-3">{select.name}</span>
						</div>
						<div>
							<Select
								onValueChange={(value) =>
									handleValueChange(value, select.options)
								}
							>
								<SelectTrigger className="w-min focus:outline-none border-none shadow-none"></SelectTrigger>
								<SelectContent>
									<SelectGroup key={index}>
										{select.options.map((option, index) => (
											<SelectItem
												key={index}
												value={option}
												// value={}
												className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px] flex items-center h-[35px]"
											>
												{option}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				))}
			</div>

			{/* Apply Button */}
			<Button
				className="bg-primaryBlue px-6 py-5 text-white rounded-sm self-center w-48"
				disabled={selectedOptions.length === 0}
			>
				Apply
			</Button>
		</div>
	);
}

export default FilterSelect;
