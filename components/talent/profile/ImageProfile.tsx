"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  BsPlusCircleDotted,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";

import AddPhoto from "./AddPhoto";
import { IoMdClose } from "react-icons/io";

interface ImageProfileProps {
  isPics: boolean;
}

const ImageProfile: React.FC<ImageProfileProps> = ({ isPics = true }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState([
    "/Images/Gallery1.png",
    "/Images/Gallery2.png",
    "/Images/Gallery3.png",
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modeView, setModeView] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setModeView(null);
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
    if (files && files.length > 0) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImageUrls]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="card">
      <h2 className="text-base font-normal mb-6">Images</h2>

      {isPics ? (
        <div className={`flex ${images.length > 3 ? 'flex-wrap' : ''} gap-4`}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[188px] w-[210px] bg-gray-100 rounded-lg"
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover rounded-lg"
                fill
              />
              <button
                onClick={() => toggleModeView(index)}
                className="absolute top-2 right-2 bg-white hover:bg-gray-300 p-1 rounded-full text-xs"
              >
                <BsThreeDotsVertical size={25} color="black" />
              </button>

              {modeView === index && (
                <div className="w-[70%] absolute p-1 top-12 right-2 flex flex-col bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => handleView(image)}
                    className="w-full text-start pl-2 rounded-lg py-1 text-[12px] font-bold hover:bg-[#3377FF2E] hover:text-primaryBlue"
                  >
                    View Picture
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="w-full text-start pl-2 rounded-lg py-1 text-[12px] font-bold hover:bg-[#3377FF2E] hover:text-primaryBlue"
                  >
                    Delete Picture
                  </button>
                </div>
              )}
            </div>
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
            src={"/Images/gallery-slash.png"}
            alt="No photos available"
            width={100}
            height={100}
          />
          <p className="text-[#9390908F]">No photos added yet</p>
          <AddPhoto />
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Selected Image"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              width={800}
              height={600}
              priority
            />

            <button
              className="absolute top-4 right-4 bg-white hover:bg-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSelectedImage(null)}
              aria-label="Close Viewer"
            >
              <IoMdClose size={18} color="black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageProfile;
