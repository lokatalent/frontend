"use client";
import ProfilePics from "@/components/ui/gen/ProfilePics";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  profileImage: string;
  rating: number; // Number of stars (1-5)
  reviewText: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, profileImage, rating, reviewText }) => {
  return (
    <div className="w-full flex items-center  space-x-6 p-4">
      <div>
        <ProfilePics isProfile={profileImage} isEdit={false} />
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between items-start text-gray-800">
          <p className="text-xl font-semibold">{name}</p>
          
          <div className="flex space-x-1 items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < rating ? "#FFAC33" : "#D6DDEB"} />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">{reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
