import React, { useState } from "react";
import { ChevronLeft, Search, Bookmark, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";

interface BannerProps {
  variant?: "home" | "region" | "saved" | "incidence" | "about";
  title?: string;
  subtitle?: string;
  count?: string;
  color?: string;
  bgColor?: string;
  icon?: string;
  showSearch?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  variant = "home",
  title,
  subtitle,
  count,
  color,
  bgColor,
  icon,
  showSearch = true,
}) => {
  const navigate = useNavigate();
  const [ModalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(!ModalOpen);
  };

  if (variant === "home") {
    return (
      <div className="w-full h-fit bg-[#00874A] rounded-b-2xl px-6 flex flex-col justify-center gap-4 relative py-8 pb-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-[24px] font-bold tracking-tight">
              RadioPos
            </h1>
          </div>
          
          <div className="relative">
            {ModalOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setModalOpen(false)}
                />
                <div className="absolute top-14 right-0 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <Modal onClose={() => setModalOpen(false)} />
                </div>
              </>
            )}
            
            <button
              onClick={() => handleModal()}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                ModalOpen 
                  ? "bg-white text-[#00874A] rotate-90 scale-110" 
                  : "bg-white/15 hover:bg-white/25 active:scale-95"
              }`}
            >
              <EllipsisVertical 
                className={`w-8 h-8 transition-colors duration-300 ${ModalOpen ? "text-[#00874A]" : "text-white"}`} 
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-white text-[22px] font-bold leading-tight">
            Posicionamentos
          </h2>
          <p className="text-white/90 text-sm font-medium">Radiológicos</p>
        </div>

        {showSearch && (
          <div className="relative mt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar incidência ou região"
              className="w-full h-12 bg-white/20 rounded-2xl pl-12 pr-4 text-sm outline-none shadow-sm placeholder:text-white text-white border border-white/10"
            />
          </div>
        )}
      </div>
    );
  }

  if (variant === "region") {
    return (
      <div
        className="w-full h-fit rounded-b-2xl px-6 py-6 pb-12 flex flex-col gap-4 relative"
        style={{ backgroundColor: bgColor }}
      >
        <button
          onClick={() => navigate("/")}
          className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-[#1a5276]"
          style={{ color: color }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          >
            {icon && (
              <img
                src={icon}
                alt={title}
                className="w-10 h-10 object-contain"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h2
              className="text-[20px] font-bold leading-tight"
              style={{ color: color }}
            >
              {title}
            </h2>
            <p className="text-[#555555] text-sm font-medium">{count}</p>
          </div>
        </div>

        {showSearch && (
          <div className="bottom-6 left-6 right-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar em Crânio"
                className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 text-sm outline-none shadow-md placeholder:text-[#999999] text-[#000000] border border-black/5"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "saved") {
    return (
      <div className="w-full h-fit bg-[#00874A] rounded-b-2xl px-6 py-6 pb-12 flex flex-col gap-4 relative">
        <button
          onClick={() => navigate("/")}
          className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <h2 className="text-white text-[24px] font-bold leading-tight">
          Salvas
        </h2>

        {showSearch && (
          <div className="bottom-6 left-6 right-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar incidência"
                className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 text-sm outline-none shadow-md placeholder:text-[#999999] text-[#000000] border border-black/5"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "incidence") {
    return (
      <div
        className="w-full h-fit rounded-b-2xl px-6 py-6 pb-6 flex flex-col gap-4 relative"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center"
            style={{ color: color }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center"
            style={{ color: color }}
          >
            <Bookmark className="w-7 h-7" />
          </button>
        </div>

        <div className="flex flex-col">
          <h2
            className="text-[20px] font-bold leading-tight"
            style={{ color: color }}
          >
            {title}
          </h2>
          <p className="text-[#555555] text-sm font-medium">{subtitle}</p>
        </div>
      </div>
    );
  }

  if (variant === "about") {
    return (
      <div
        className="w-full h-fit rounded-b-2xl px-6 py-6 pb-6 flex flex-col gap-4 relative"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-white"
            style={{ color: color }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col">
          <h2
            className="text-[20px] font-bold leading-tight"
            style={{ color: color }}
          >
            {title}
          </h2>
          <p className="text-white/80 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Banner;
