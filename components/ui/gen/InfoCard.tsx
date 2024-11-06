import React from "react";

interface CardProp {
  text: string;
  iconColor: string;
  icon: React.ReactNode;
  number: number | string;
  comment: string;
}

const InfoCard = ({
  text,
  number,
  icon,
  iconColor,
  comment,
}: CardProp) => {
  return (
    <div className="w-[300px] bg-white shadow-lg p-4  border border-neutral-50 rounded-2xl flex flex-col  items-center">
      <div className="flex justify-between w-full mb-4">
        <div>
          <p className="text-sm font-semibold">{text}</p>
          <p className="text-2xl pt-5  font-bold">{number}</p>
          <div className="flex pt-5 gap-2">
            <p className="text-sm flex items-center font-medium">{comment}</p>
          </div>
        </div>
        <div
          className="w-12 h-12 rounded-[1rem]"
          style={{
            backgroundColor: iconColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
