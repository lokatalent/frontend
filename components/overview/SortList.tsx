"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

interface SortProp {
  options: string[];
  onSortChange: (value: string) => void;
}




function handleValueChange(value: string) {}

const SortList = ({ options, onSortChange }: SortProp) => {
  const [value, setValue] = useState(options[0]); // Initial selected option
  // console.log(options)
 
  return (
    <Select onValueChange={(value) => {setValue(value), onSortChange(value)}}>
      <SelectTrigger className="w-min bg-[#E5E7EB4A] focus:outline-none border-none shadow-none focus:ring-0 focus:ring-none">
        <div className="flex  items-center gap-2">
          <p>Sort by: </p>
          <p className="mr-2">{value}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option: string, index: number) => (
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
  );
};

export default SortList;
