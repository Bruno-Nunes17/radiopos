import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface IncidenceCardProps {
  title: string;
  subtitle?: string;
  tag?: string;
  icon?: string;
  color: string;
  bgColor: string;
  className?: string;
  onClick?: () => void;
}

const IncidenceCard: React.FC<IncidenceCardProps> = ({
  title,
  subtitle,
  tag,
  icon,
  color,
  bgColor,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-black/5 cursor-pointer hover:bg-gray-50 transition-colors",
        className
      )}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {icon && (
          <img
            src={icon}
            alt={title}
            className="w-8 h-8 object-contain"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-[#000000] leading-tight truncate">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[12px] text-[#555555] mt-0.5 truncate">{subtitle}</p>
        )}
        {tag && (
          <div
            className="mt-2 inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{ backgroundColor: bgColor, color: color }}
          >
            {tag}
          </div>
        )}
      </div>
      <ChevronRight className="text-gray-300 w-5 h-5 shrink-0" />
    </div>
  );
};

export default IncidenceCard;
