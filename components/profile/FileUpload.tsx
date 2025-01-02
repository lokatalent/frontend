"use client";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import fileUploadImg from "@/public/Images/upload.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootStateProfile, setFileStore } from "@/store/profile/profileSlice";
import { FormFieldError } from "../ui/form/FormFieldError";

type MessageObject = {
  message: string;
};


const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<MessageObject>({ message: 'Select a file to continue' });
  const dispatch = useDispatch();
  const files = useSelector(
    (state: RootStateProfile) => state.profile.file
  );

  // Allowed file types
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError({
        message: "Invalid file type. Please upload PDF or image files (JPEG, PNG, GIF)"
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError({message: "File size too large. Please upload files smaller than 5MB"});
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError({message: ""});

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      const url = URL.createObjectURL(droppedFile);
        dispatch(setFileStore(url));
     
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
     setError({message: ""});
      const selectedFile = e.target.files?.[0];
      if (selectedFile && validateFile(selectedFile)) {
        setFile(selectedFile);
        console.log(selectedFile);
        // URL.createObjectURL;
         const url = URL.createObjectURL(selectedFile);
        dispatch(setFileStore(url));
        // sessionStorage.setItem('selectedFile', URL.createObjectURL(selectedFile));
      }
    },
    []
  );


  const handleRemove = useCallback(() => {
    setFile(null);
  //  setError({message: ""});
    sessionStorage.removeItem('selectedFile');
        dispatch(setFileStore(null));

  }, []);

  return (
    <div className="w-full mx-auto">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg  text-center",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "transition-all duration-200"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileSelect}
          accept={allowedTypes.join(",")}
        />

        {!file ? (
          <>
            <div>
              <div
                className={` bg-white text-[#3377FF] rounded px-[1rem] py-4 flex items-center justify-content flex-col`}
              >
                <div>
                  <Image
                    src={fileUploadImg}
                    alt="File Upload"
                    className="w-10"
                  />
                </div>
                <Button
                  variant="ghost"
                  className=" text-[12px] sm:text-sm text-blue-600 hover:text-blue-700"
                  onClick={(event) => {
                    event.preventDefault(); // Prevent default button behavior
                    document.getElementById("fileInput")?.click();
                  }}
                >
                  Click to upload
                  <span className="text-[12px] sm:text-sm text-gray-500">
                    {" "}
                    or drag and drop
                  </span>
                </Button>
                <p className="text-[11px] text-black">SVG, HEIC, PNG, JPG</p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4  py-4 ">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm font-medium">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)}MB
            </p>
          </div>
        )}
      </div>

      {!files && <FormFieldError error={error} />}
    </div>
  );
};

export default FileUpload;
