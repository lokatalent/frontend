"use client";
import ProfilePics from "@/components/ui/gen/ProfilePics";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  profileImage?: string; // Optional profile image
  rating: number; // Number of stars (1-5)
  reviewText: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  profileImage = "", // Default to an empty string if no image provided
  rating,
  reviewText,
}) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index < rating ? "#FFAC33" : "#D6DDEB"}
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className="w-full flex items-center space-x-6 p-4">
      {/* Profile Picture */}
      <div>
        <ProfilePics isProfile={profileImage} isEdit={false} />
      </div>

      {/* Review Content */}
      <div className="w-full">
        <div className="flex justify-between items-start text-gray-800">
          {/* Name */}
          <p className="text-xl font-semibold">{name}</p>

          {/* Rating */}
          <div
            className="flex space-x-1 items-center mt-2"
            aria-label={`Rating: ${rating} out of 5 stars`}
          >
            {renderStars(rating)}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm mt-2">{reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
