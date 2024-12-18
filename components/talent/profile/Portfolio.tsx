"use client";
import React, { useState } from "react";
import HoursProfile from "@/components/talent/profile/HoursProfile";
import ImageProfile from "@/components/talent/profile/ImageProfile";
import SkillsProfile from "@/components/talent/profile/SkillsProfile";
import Image from "next/image";

interface PortfolioProps {
  isData: boolean;
  data?: string[] | null | any;
}

function Portfolio({ isData, data }: PortfolioProps) {
  return (
    <div className="space-y-6">
      {isData ? (
        <>
          <SkillsProfile skillsSet={data} />
          <HoursProfile />
          <ImageProfile />
        </>
      ) : (
        <div className="card flex-center flex-col">
          <Image
            src={"/Images/emptyPortfolio.png"}
            alt="empty portfolio"
            width={200}
            height={200}
          />
          <p>
            Nothing to show here. Complete your profile set up to set up your
            portfolio
          </p>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
