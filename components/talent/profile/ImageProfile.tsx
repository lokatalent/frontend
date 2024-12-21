"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BsPlusCircleDotted, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddPhoto from "./AddPhoto";
import { RootStateTalentProfile } from "@/store/talent/profile/TalentProfileSlice";

const ImageProfile: React.FC = () => {
  const [isPics, setIsPics] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addedPhoto = useSelector(
    (state: RootStateTalentProfile) => state.talentProfile.files
  );
  const [images, setImages] = useState<string[]>(
    addedPhoto.map((photo) => photo.url),
    
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modeView, setModeView] = useState<number | null>(null);

  useEffect(() => {
    const updatedImages = [
      ...images.filter((img) => !addedPhoto.some((photo) => photo.url === img)),
      ...addedPhoto.map((photo) => photo.url),
    ];
    setImages(updatedImages);
    setIsPics(updatedImages.length > 0);
  }, [addedPhoto]);

  const handleDelete = (index: number) => {
    setModeView(null);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleView = (image: string) => {
    setSelectedImage(image);
    setModeView(null);
  };

  const toggleModeView = (index: number) => {
    setModeView((prev) => (prev === index ? null : index));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
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
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index}
              modeView={modeView}
              onToggleModeView={toggleModeView}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}

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