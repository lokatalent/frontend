import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CiSearch } from "react-icons/ci";

function DropDownElement() {
	return (
    <div className="flex flex-row gap-2 my-8  w-[20rem]">
      <div className=" flex-1 ">
        <Select>
          <SelectTrigger className="appearance-none h-10 px-2 pr-8 text-sm bg-transparent border border-white rounded-md focus:outline-none">
            <SelectValue placeholder="What services do you need?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="laundry">Laundry</SelectItem>
              <SelectItem value="cleaing">Cleaning</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-[#ede8e8] h-10 w-10 rounded flex items-center justify-center">
        <CiSearch color="black" />
      </div>
    </div>
  );
}

export default DropDownElement;
