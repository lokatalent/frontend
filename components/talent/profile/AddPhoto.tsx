"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "@/components/profile/FileUpload";
import { addFile, removeFile } from "@/store/talent/profile/TalentProfileSlice";
import { useDispatch } from "react-redux";

interface ReviewModalProps {
  linkTo: string;
}

export default function AddPhoto() {
  const dispatch = useDispatch();

  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="font-nunito text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] mx-auto rounded h-14 flex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
      >
        Add Photo
      </DialogTrigger>
      <DialogContent className="w-full p-[3rem] sm:max-w-[20rem] lg:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle className="text-center">Photo Guidelines</DialogTitle>
        </DialogHeader>
        <div className="w-full gap-6 flex flex-col justify-center items-center gap-[2rem]">
          <ul>
            <li className="text-sm">
              <span className="text-[#DF8600]  text-xl mr-10">•</span>Photo must
              show your face clearly
            </li>
            <li className="text-sm">
              <span className="text-[#DF8600] text-xl  mr-10">•</span>Photo must
              be either SVG, JPG or{" "}
            </li>
            <li className="text-sm">
              <span className="text-[#DF8600] text-xl  mr-10">•</span>
              Photo should have a resolution of at least 800 x 800 pixels
            </li>
          </ul>
          <div>
            <FileUpload
              allowedTypes={["image/jpeg", "image/png"]}
              maxFileSizeMB={10}
              onFileUpload={(file, url) => {
                const newFile = {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  lastModified: file.lastModified,
                };
                dispatch(addFile({ newFile, url }));
              }}
              onFileRemove={(file, url) => {
                dispatch(removeFile(url));
              }}
              uploadLabel="Upload File"
              dragDropLabel=" or drop here"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
