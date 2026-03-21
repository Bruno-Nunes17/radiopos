import React from "react";
import { Bookmark, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-2 min-w-40 border border-black/5 flex flex-col gap-1 overflow-hidden">
      <button
        onClick={() => handleNavigation("/saved")}
        className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors text-left"
      >
        <Bookmark className="w-5 h-5 text-[#00874A]" />
        <span className="text-sm font-semibold text-[#333]">Salvos</span>
      </button>
      
      <div className="h-px bg-black/5 mx-2" />
      
      <button
        onClick={() => handleNavigation("/about")}
        className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors text-left"
      >
        <Info className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#333]">Sobre</span>
      </button>
    </div>
  );
};
