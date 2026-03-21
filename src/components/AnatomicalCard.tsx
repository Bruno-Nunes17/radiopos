import React from "react";

interface AnatomicalCardProps {
  name: string;
  count: number;
  icon: string;
  bgColor: string;
  onClick?: () => void;
}

const AnatomicalCard: React.FC<AnatomicalCardProps> = ({
  name,
  count,
  icon,
  bgColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-4 flex flex-col gap-3 shadow-sm border border-black/5 items-start cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="rounded-xl flex items-center justify-center">
        <img
          src={icon}
          alt={name}
          className="w-15 h-15 object-contain"
        />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-[#000000] leading-tight text-start">
          {name}
        </h4>
        <p className="text-[12px] text-[#555555] mt-1 text-start">
          {count} incidências
        </p>
      </div>
    </div>
  );
};

export default AnatomicalCard;
