"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { FormFieldError } from "../ui/form/FormFieldError";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import {
  setFileStore,
  setVerificationStore,
} from "@/store/profile/profileSlice";

// interface InputDropdownProps {
//   options: string[];
//   error?: any;
//   buttonAction: string;
//   default?: string;
// }

// function InputDropdown({  default: defaultValue = '', options, error, buttonAction }: InputDropdownProps) {
//   const [selectedService, setSelectedService] = useState<string | undefined>(defaultValue);
//   const dispatch = useDispatch();
//   console.log(buttonAction);

//   const handleServiceChange = (value: string) => {
//     setSelectedService(value);
//     console.log(value);
//     dispatch(setVerificationStore(value));
//   };

//   // const fileHandler = (file: File) => {
//   // console.log(file);
//   // console.log(selectedService);
//   // uploadFileHandler(selectedService, file);
//   // };

//   const uploadHandler = () => {};

//   return (
//     <div className="space-y-5">
//       <div>
//         <Select value={selectedService} onValueChange={handleServiceChange}>
//           <SelectTrigger className="appearance-none w-full h-[3rem] px-3 py-1 text-sm bg-white border-2 border-white rounded-md focus:outline-none">
//             {selectedService ? (
//               <SelectValue>{selectedService}</SelectValue>
//             ) : (
//               <SelectValue placeholder="" />
//             )}
//           </SelectTrigger>
//           <SelectContent className="w-[414px]">
//             <SelectGroup>
//               {options.map((option) => (
//                 <SelectItem
//                   value={option}
//                   key={option}
//                   className="focus:bg-[#3377FF3D] focus:text-[#3377FF]"
//                 >
//                   {option}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         {error && <FormFieldError error={error} />}
//       </div>
//       {selectedService &&
//       (buttonAction === "addressVerification" ||
//         buttonAction === "edit-address") ? (
//         // <FileUpload />

//         <FileUpload
//           allowedTypes={["image/jpeg", "image/png"]}
//           maxFileSizeMB={10}
//           onFileSelect={(file, url) => {
//             // console.log("File selected:", file)
//             // console.log(url, file)
//             dispatch(setFileStore(url));
//             // console.log("File URL:", url);
//           }}
//           uploadLabel="Upload File"
//           dragDropLabel=" or drop here"
//         />
//       ) : null}
//     </div>
//   );
// }

// export default InputDropdown;

interface InputDropdownProps {
  options: string[];
  error?: any;
  buttonAction: string;
  default?: string;
  onValueChange?: (value: string) => void; // Add this line
}

function InputDropdown({
  default: defaultValue = "",
  options,
  error,
  buttonAction,
  onValueChange, // Add this parameter
}: InputDropdownProps) {
  const [selectedService, setSelectedService] = useState<string | undefined>(
    defaultValue
  );
  const dispatch = useDispatch();

  const handleServiceChange = (value: string) => {
    setSelectedService(value);

    // Dispatch to Redux store if needed
    dispatch(setVerificationStore(value));

    // Call onValueChange if provided
    onValueChange?.(value);
  };

  // Rest of the component remains the same...

  return (
    <div className="space-y-5">
      <div>
        <Select value={selectedService} onValueChange={handleServiceChange}>
          <SelectTrigger className="appearance-none w-full h-[3rem] px-3 py-1 text-sm bg-white border-2 border-white rounded-md focus:outline-none">
            {selectedService ? (
              <SelectValue>{selectedService}</SelectValue>
            ) : (
              <SelectValue placeholder="" />
            )}
          </SelectTrigger>
          <SelectContent className="w-[414px]">
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  value={option}
                  key={option}
                  className="focus:bg-[#3377FF3D] focus:text-[#3377FF]"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && <FormFieldError error={error} />}
      </div>
      {selectedService &&
      (buttonAction === "addressVerification" ||
        buttonAction === "edit-address") ? (
        // <FileUpload />

        <FileUpload
          allowedTypes={["image/jpeg", "image/png"]}
          maxFileSizeMB={10}
          onFileSelect={(file, url) => {
            // console.log("File selected:", file)
            // console.log(url, file)
            dispatch(setFileStore(url));
            // console.log("File URL:", url);
          }}
          uploadLabel="Upload File"
          dragDropLabel=" or drop here"
        />
      ) : null}
    </div>
  );
}

export default InputDropdown;
