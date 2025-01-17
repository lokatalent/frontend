"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddPhoto from "./AddPhoto";
import { IoMdClose } from "react-icons/io";
import {
  addFile,
  removeFile,
  RootStateTalentProfile,
  updateFile,
} from "@/store/talent/profile/TalentProfileSlice";
import { RootStateTalentService } from "@/store/talent/service/TalentServiceSlice";
import { RootStateAuth } from "@/store/auth/authSlice";
import {
  deleteServiceImage,
  getServiceImages,
  uploadServiceImages,
} from "@/services/services";
import { handleUnauthorizedError } from "@/lib/utils";
import { showToast } from "@/store/auth/toastSlice";
import { BsPlusCircleDotted, BsThreeDotsVertical } from "react-icons/bs";

const ImageProfile: React.FC = () => {
  const serviceType = useSelector(
    (state: RootStateTalentService) => state.service.service.service_type
  );
  const userID = useSelector((state: RootStateAuth) => state.auth.user.id);
  const [isPics, setIsPics] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addedPhoto = useSelector(
    (state: RootStateTalentProfile) => state.talentProfile.files
  );
  console.log(addedPhoto);
  const serviceImage = useSelector(
    (state: RootStateTalentProfile) => state.talentProfile.files
  );
  // const [images, setImages] = useState<string[]>(
  //   addedPhoto.map((photo) => photo.url)
  // );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modeView, setModeView] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const getServiceImageHandler = async () => {
    let temp = {
      id: userID,
      service_type: serviceType,
    };
    const response = await getServiceImages(temp);
    console.log(response);
    if (!response.error) {
      dispatch(addFile(response.data));
    }
  };

  // useEffect(() => {
  //   const updatedImages = [
  //     ...images.filter((img) => !addedPhoto.some((photo) => photo.url === img)),
  //     ...addedPhoto.map((photo) => photo.url),
  //   ];
  //   setImages(updatedImages);
  //   setIsPics(updatedImages.length > 0);
  //   getServiceImageHandler();
  // }, []);

  const handleDelete = async (index: any) => {
    setModeView(null);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    let temp = {
      id: userID,
      service_type: serviceType,
    };
    const response = await deleteServiceImage(temp);
    console.log(response);
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Image deleted successfully",
        })
      );
      dispatch(removeFile(index))
    }
  };

  const handleView = (image: string) => {
    setSelectedImage(image);
    setModeView(null);
  };

  const toggleModeView = (index: number) => {
    setModeView((prev) => (prev === index ? null : index));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
      console.log(files, newImageUrls);

      let temp = {
        // images: newImageUrls,
        images: files,
        service_type: serviceType,
      };
      const uploadServiceImagesHandler = async () => {
        const response = await uploadServiceImages(temp);
        console.log(response);
        if (!response.error) {
          dispatch(updateFile(response.data)); // Fixed spread argument error
          // success
          dispatch(
            showToast({
              status: "success",
              message: "Images uploaded successfully",
            })
          );
        } else {
          handleUnauthorizedError(response, dispatch, router, showToast);
          dispatch(
            showToast({
              status: "error",
              message: response.error,
            })
          );
        }
      };

      uploadServiceImagesHandler();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="card">
      <h2 className="text-base font-normal mb-6">Images</h2>

      {isPics ? (
        <div className={`flex ${images.length > 3 ? "flex-wrap" : ""} gap-4`}>
          {/* {addedPhoto.map((image, index) => ( */}
            {/* <ImageCard
              key={image.id}
              image={image.url}
              index={image.id}
              modeView={modeView}
              onToggleModeView={toggleModeView}
              onView={handleView}
              onDelete={handleDelete} */}
            {/* /> */}
          {/* ))} */}

          <div
            onClick={triggerFileInput}
            className="relative h-[188px] w-[210px] bg-[#C4C4C414] flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <BsPlusCircleDotted size={40} color="#3377FF" />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <Image
            src="/Images/gallery-slash.png"
            alt="No photos available"
            width={100}
            height={100}
          />
          <p className="text-[#9390908F]">No photos added yet</p>
          <AddPhoto />
        </div>
      )}
      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

const ImageCard: React.FC<{
  image: string;
  index: number;
  modeView: number | null;
  onToggleModeView: (index: number) => void;
  onView: (image: string) => void;
  onDelete: (index: number) => void;
}> = ({ image, index, modeView, onToggleModeView, onView, onDelete }) => {
  return (
    <div className="relative h-[188px] w-[210px] bg-gray-100 rounded-lg">
      <Image
        src={image}
        alt={`Gallery Image ${index + 1}`}
        className="object-cover rounded-lg"
        fill
      />
      <button
        onClick={() => onToggleModeView(index)}
        className="absolute top-2 right-2 bg-white hover:bg-gray-300 p-1 rounded-full text-xs"
      >
        <BsThreeDotsVertical size={25} color="black" />
      </button>

      {modeView === index && (
        <div className="w-[70%] absolute p-1 top-12 right-2 flex flex-col bg-white rounded-lg shadow-md">
          <button
            onClick={() => onView(image)}
            className="w-full text-start pl-2 rounded-lg py-1 text-[12px] font-bold hover:bg-[#3377FF2E] hover:text-primaryBlue"
          >
            View Picture
          </button>

          <DeleteImageProfile
            onConfirmDelete={() => onDelete(index)}
            imageNumber={index + 1}
          />
        </div>
      )}
    </div>
  );
};

const ImageViewer: React.FC<{ image: string; onClose: () => void }> = ({
  image,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Image
          src={image}
          alt="Selected Image"
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          width={800}
          height={600}
          priority
        />

        <button
          className="absolute top-4 right-4 bg-white hover:bg-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close Viewer"
        >
          <IoMdClose size={18} color="black" />
        </button>
      </div>
    </div>
  );
};

const DeleteImageProfile: React.FC<{
  onConfirmDelete: () => void;
  imageNumber: number;
}> = ({ onConfirmDelete, imageNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-start pl-2 rounded-lg py-1 text-[12px] font-bold hover:bg-[#3377FF2E] hover:text-primaryBlue">
          Delete Picture
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-6 sm:max-w-[25rem] lg:max-w-[30rem]">
        <DialogHeader />

        <div className="w-[3rem] h-[3rem]">
          <Image
            src="/Images/del-custom.png"
            className="object-cover"
            width={150}
            height={150}
            alt="Delete Custom Button"
          />
        </div>
        <p className="text-left text-lg font-bold">Delete this Image</p>

        <div className="my-3">
          <p className="text-gray-600">
            This action cannot be undone, and the image will be permanently
            removed from your profile {imageNumber}.
          </p>
        </div>

        <div className="flex gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              className="px-28 py-7 text-sm"
              onClick={() => {
                onConfirmDelete();
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageProfile;

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import AddPhoto from "./AddPhoto";
// import { IoMdClose } from "react-icons/io";
// import {
//   addFile,
//   RootStateTalentProfile,
// } from "@/store/talent/profile/TalentProfileSlice";
// import { RootStateTalentService } from "@/store/talent/service/TalentServiceSlice";
// import { RootStateAuth } from "@/store/auth/authSlice";
// import {
//   deleteServiceImage,
//   getServiceImages,
//   uploadServiceImages,
// } from "@/services/services";
// import { handleUnauthorizedError } from "@/lib/utils";
// import { showToast } from "@/store/auth/toastSlice";
// import { BsPlusCircleDotted, BsThreeDotsVertical } from "react-icons/bs";

// const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
//   <div
//     className={`animate-spin border-4 border-t-transparent rounded-full ${
//       className || "h-6 w-6"
//     }`}
//   />
// );

// const ImageProfile: React.FC = () => {
//   const serviceType = useSelector(
//     (state: RootStateTalentService) => state.service.service.service_type
//   );
//   const userID = useSelector((state: RootStateAuth) => state.auth.user.id);
//   const addedPhoto = useSelector(
//     (state: RootStateTalentProfile) => state.talentProfile.files
//   );
//   console.log(addedPhoto);
//   const [images, setImages] = useState<string[]>(
//     addedPhoto.map((photo) => photo.url)
//   );
//   console.log(images);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [modeView, setModeView] = useState<number | null>(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState<number | null>(null);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const fetchServiceImages = async () => {
//     setIsFetching(true);
//     try {
//       const response = await getServiceImages({
//         id: userID,
//         service_type: serviceType,
//       });
//       console.log(response);
//       if (!response.error) {
//         dispatch(addFile(response.data));
//       }
//     } catch (error) {
//       console.error("Failed to fetch service images", error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceImages();
//   }, []);

//   const handleDelete = async (index: number) => {
//     setIsDeleting(index);
//     try {
//       const response = await deleteServiceImage({
//         id: userID,
//         service_type: serviceType,
//       });
//       if (!response.error) {
//         setImages((prev) => prev.filter((_, i) => i !== index));
//       }
//     } catch (error) {
//       console.error("Failed to delete image", error);
//     } finally {
//       setIsDeleting(null);
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files || files.length === 0) return;

//     setIsUploading(true);
//     const uploadHandler = async () => {
//       try {
//         const response = await uploadServiceImages({
//           images: files,
//           service_type: serviceType,
//         });
//         console.log(response);
//         if (!response.error) {
//           dispatch(addFile(response.data));
//           dispatch(
//             showToast({
//               status: "success",
//               message: "Images uploaded successfully",
//             })
//           );
//         } else {
//           handleUnauthorizedError(response, dispatch, router, showToast);
//           dispatch(showToast({ status: "error", message: response.error }));
//         }
//       } catch (error) {
//         console.error("Failed to upload images", error);
//       } finally {
//         setIsUploading(false);
//       }
//     };

//     uploadHandler();
//   };

//   const triggerFileInput = () => fileInputRef.current?.click();

//   return (
//     <div className="card">
//       <h2 className="text-base font-normal mb-6">Images</h2>
//       {isFetching ? (
//         <div className="flex justify-center items-center h-32">
//           <LoadingSpinner className="h-12 w-12 border-primaryBlue" />
//         </div>
//       ) : addedPhoto.length >= 0 ? (
//         <div className={`flex ${images.length > 3 ? "flex-wrap" : ""} gap-4`}>
//           {addedPhoto.map((image, index) => (
//             <ImageCard
//               key={index}
//               image={image}
//               index={index}
//               modeView={modeView}
//               onToggleModeView={setModeView}
//               onView={setSelectedImage}
//               onDelete={handleDelete}
//               isDeleting={isDeleting === index}
//             />
//           ))}
//           <div
//             onClick={triggerFileInput}
//             className="relative h-[188px] w-[210px] bg-[#C4C4C414] flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100"
//           >
//             {isUploading ? (
//               <LoadingSpinner className="h-10 w-10 border-primaryBlue" />
//             ) : (
//               <BsPlusCircleDotted size={40} color="#3377FF" />
//             )}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFileSelect}
//               className="hidden"
//             />
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center space-y-3">
//           <Image
//             src="/Images/gallery-slash.png"
//             alt="No photos available"
//             width={100}
//             height={100}
//           />
//           <p className="text-[#9390908F]">No photos added yet</p>
//           <AddPhoto />
//         </div>
//       )}
//       {selectedImage && (
//         <ImageViewer
//           image={selectedImage}
//           onClose={() => setSelectedImage(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ImageProfile;
