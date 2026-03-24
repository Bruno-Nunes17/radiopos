import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Banner 
        variant="about" 
        title="Página não encontrada" 
        subtitle="O conteúdo que você procura não existe ou foi removido."
        bgColor="#555555"
        color="#FFFFFF"
      />
      
      <div className="flex flex-col items-center justify-center p-8 mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl font-bold text-gray-300">404</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Onde estamos?</h3>
        <p className="text-gray-500 text-sm max-w-[250px] leading-relaxed mb-10">
          Parece que você seguiu um link quebrado ou digitou um endereço incorreto.
        </p>

        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={() => navigate("/")}
            className="w-full py-4 bg-[#00874A] hover:bg-[#00703e] text-white rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md font-bold active:scale-[0.98]"
          >
            <Home className="w-5 h-5" />
            Voltar para o Início
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-gray-50 font-bold active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5" />
            Página Anterior
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
