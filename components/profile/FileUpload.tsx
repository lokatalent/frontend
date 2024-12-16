// "use client";
// import React, { useCallback, useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import fileUploadImg from "@/public/Images/upload.png";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { RootStateProfile, setFileStore } from "@/store/profile/profileSlice";
// import { FormFieldError } from "../ui/form/FormFieldError";

// type MessageObject = {
//   message: string;
// };


// const FileUpload = () => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<MessageObject>({ message: 'Select a file to continue' });
//   const dispatch = useDispatch();
//   const files = useSelector(
//     (state: RootStateProfile) => state.profile.file
//   );

//   // Allowed file types
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "application/pdf",
//   ];

//   const handleDragEnter = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const validateFile = (file: File) => {
//     if (!allowedTypes.includes(file.type)) {
//       setError({
//         message: "Invalid file type. Please upload PDF or image files (JPEG, PNG, GIF)"
//       });
//       return false;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       // 5MB limit
//       setError({message: "File size too large. Please upload files smaller than 5MB"});
//       return false;
//     }
//     return true;
//   };

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     setError({message: ""});

//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && validateFile(droppedFile)) {
//       setFile(droppedFile);
//       const url = URL.createObjectURL(droppedFile);
//         dispatch(setFileStore(url));
     
//     }
//   }, []);

//   const handleFileSelect = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//      setError({message: ""});
//       const selectedFile = e.target.files?.[0];
//       if (selectedFile && validateFile(selectedFile)) {
//         setFile(selectedFile);
//         console.log(selectedFile);
//         // URL.createObjectURL;
//          const url = URL.createObjectURL(selectedFile);
//         dispatch(setFileStore(url));
//         // sessionStorage.setItem('selectedFile', URL.createObjectURL(selectedFile));
//       }
//     },
//     []
//   );


//   const handleRemove = useCallback(() => {
//     setFile(null);
//   //  setError({message: ""});
//     sessionStorage.removeItem('selectedFile');
//         dispatch(setFileStore(null));

//   }, []);

//   return (
//     <div className="w-full mx-auto">
//       <div
//         className={cn(
//           "border-2 border-dashed rounded-lg  text-center",
//           isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
//           "transition-all duration-200"
//         )}
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <input
//           type="file"
//           id="fileInput"
//           className="hidden"
//           onChange={handleFileSelect}
//           accept={allowedTypes.join(",")}
//         />

//         {!file ? (
//           <>
//             <div>
//               <div
//                 className={` bg-white text-[#3377FF] rounded px-[1rem] py-4 flex items-center justify-content flex-col`}
//               >
//                 <div>
//                   <Image
//                     src={fileUploadImg}
//                     alt="File Upload"
//                     className="w-10"
//                   />
//                 </div>
//                 <Button
//                   variant="ghost"
//                   className="text-blue-600 hover:text-blue-700"
//                   onClick={(event) => {
//                     event.preventDefault(); // Prevent default button behavior
//                     document.getElementById("fileInput")?.click();
//                   }}
//                 >
//                   Click to upload
//                   <span className="text-gray-500"> or drag and drop</span>
//                 </Button>
//                 <p className="text-[11px] text-black">SVG, HEIC, PNG, JPG</p>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="space-y-4  py-4 ">
//             <div className="flex items-center justify-center space-x-2">
//               <span className="text-sm font-medium">{file.name}</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-red-600 hover:text-red-700"
//                 onClick={handleRemove}
//               >
//                 Remove
//               </Button>
//             </div>
//             <p className="text-sm text-gray-500">
//               {(file.size / 1024 / 1024).toFixed(2)}MB
//             </p>
//           </div>
//         )}
//       </div>

//       {!files && <FormFieldError error={error} />}
//     </div>
//   );
// };

// export default FileUpload;


/// METHOD 1
// "use client";
// import React, { useCallback, useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import fileUploadImg from "@/public/Images/upload.png";
// import Image from "next/image";
// import { FormFieldError } from "../ui/form/FormFieldError";

// type MessageObject = {
//   message: string;
// };

// type FileUploadProps = {
//   allowedTypes?: string[];
//   maxFileSizeMB?: number;
//   onFileSelect: (file: File | null, url: string | null) => void;
//   errorMessage?: string;
//   uploadLabel?: string;
//   dragDropLabel?: string;
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"],
//   maxFileSizeMB = 5,
//   onFileSelect,
//   errorMessage = "Select a file to continue",
//   uploadLabel = "Click to upload",
//   dragDropLabel = " or drag and drop",
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<MessageObject>({ message: errorMessage });

//   const handleDragEnter = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const validateFile = (file: File) => {
//     if (!allowedTypes.includes(file.type)) {
//       setError({
//         message: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
//       });
//       return false;
//     }
//     if (file.size > maxFileSizeMB * 1024 * 1024) {
//       setError({
//         message: `File size too large. Max size: ${maxFileSizeMB}MB`,
//       });
//       return false;
//     }
//     return true;
//   };

//   const handleDrop = useCallback(
//     (e: React.DragEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(false);
//       setError({ message: "" });

//       const droppedFile = e.dataTransfer.files[0];
//       if (droppedFile && validateFile(droppedFile)) {
//         setFile(droppedFile);
//         const url = URL.createObjectURL(droppedFile);
//         onFileSelect(droppedFile, url);
//       }
//     },
//     [onFileSelect, allowedTypes, maxFileSizeMB]
//   );

//   const handleFileSelect = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setError({ message: "" });
//       const selectedFile = e.target.files?.[0];
//       if (selectedFile && validateFile(selectedFile)) {
//         setFile(selectedFile);
//         const url = URL.createObjectURL(selectedFile);
//         onFileSelect(selectedFile, url);
//       }
//     },
//     [onFileSelect, allowedTypes, maxFileSizeMB]
//   );

//   const handleRemove = useCallback(() => {
//     setFile(null);
//     onFileSelect(null, null);
//   }, [onFileSelect]);

//   return (
//     <div className="w-full mx-auto">
//       <div
//         className={cn(
//           "border-2 border-dashed rounded-lg text-center",
//           isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
//           "transition-all duration-200"
//         )}
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <input
//           type="file"
//           id="fileInput"
//           className="hidden"
//           onChange={handleFileSelect}
//           accept={allowedTypes.join(",")}
//         />

//         {!file ? (
//           <div className="bg-white text-[#3377FF] rounded px-[1rem] py-4 flex items-center flex-col">
//             <Image src={fileUploadImg} alt="File Upload" className="w-10" />
//             <Button
//               variant="ghost"
//               className="text-blue-600 hover:text-blue-700"
//               onClick={() => document.getElementById("fileInput")?.click()}
//             >
//               {uploadLabel}
//               <span className="text-gray-500">{dragDropLabel}</span>
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-4 py-4">
//             <div className="flex items-center justify-center space-x-2">
//               <span className="text-sm font-medium">{file.name}</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-red-600 hover:text-red-700"
//                 onClick={handleRemove}
//               >
//                 Remove
//               </Button>
//             </div>
//             <p className="text-sm text-gray-500">
//               {(file.size / 1024 / 1024).toFixed(2)}MB
//             </p>
//           </div>
//         )}
//       </div>

//       {error.message && <FormFieldError error={error} />}
//     </div>
//   );
// };

// export default FileUpload;


// METHOD 3
"use client";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import fileUploadImg from "@/public/Images/upload.png";
import Image from "next/image";
import { FormFieldError } from "../ui/form/FormFieldError";
import { addFile, removeFile } from "@/store/talent/profile/TalentProfileSlice";
 // Adjust path as needed
// import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

type MessageObject = {
  message: string;
};

type FileUploadProps = {
  allowedTypes?: string[];
  maxFileSizeMB?: number;
  onFileSelect?: (file: File | null, url: string | null) => void;
  errorMessage?: string;
  uploadLabel?: string;
  dragDropLabel?: string;
};

const FileUpload: React.FC<FileUploadProps> = ({
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"],
  maxFileSizeMB = 5,
  onFileSelect,
  errorMessage = "Select a file to continue",
  uploadLabel = "Click to upload",
  dragDropLabel = " or drag and drop",
}) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string| null>(null);
  const [error, setError] = useState<MessageObject>({ message: errorMessage });

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
        message: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
      });
      return false;
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError({
        message: `File size too large. Max size: ${maxFileSizeMB}MB`,
      });
      return false;
    }
    return true;
  };

  const handleFileUpload = useCallback(
    (selectedFile: File) => {
      if (validateFile(selectedFile)) {
        // Create a URL for the file
        const url = URL.createObjectURL(selectedFile);

        // Generate a unique ID for the file
        // const fileId = uuidv4();

        // Dispatch the file to Redux store
        // dispatch(
        //   addFile({
        //     id: `1`,
        //     name: selectedFile.name,
        //     url: url,
        //   })
        // );

        // Update local state
        setFileUrl(url);
        setFile(selectedFile);
        setError({ message: "" });

        // Optional: Call parent component's onFileSelect if provided
        onFileSelect?.(selectedFile, url);
      }
    },
    [dispatch, onFileSelect, allowedTypes, maxFileSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      console.log(droppedFile);
      if (droppedFile) {
        handleFileUpload(droppedFile);
      }
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      console.log(selectedFile);
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    },
    [handleFileUpload]
  );

  const handleRemove = useCallback(() => {
    if (file) {
      
      // const url = URL.createObjectURL(file);
      // console.log(url);
      
      // Remove the file from Redux store
      // Using the file name as an identifier (you might want to use a more robust method)
      console.log(file)
      dispatch(removeFile(fileUrl));
      
      // Revoke the object URL to free up memory
      // URL.revokeObjectURL(url);

      // Reset local state
      setFileUrl(null);
      setFile(null);
      setError({ message: errorMessage });

      // Optional: Call parent component's onFileSelect
      onFileSelect?.(null, null);
    }
  }, [file, dispatch, onFileSelect, errorMessage]);

  return (
    <div className="w-full mx-auto">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg text-center",
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
          <div className="bg-white text-[#3377FF] rounded px-[1rem] py-4 flex items-center flex-col">
            <Image src={fileUploadImg} alt="File Upload" className="w-10" />
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {uploadLabel}
              <span className="text-gray-500">{dragDropLabel}</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
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

      {error.message && <FormFieldError error={error} />}
    </div>
  );
};

export default FileUpload;