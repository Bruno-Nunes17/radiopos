import React from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { Info, Github, Mail, ShieldCheck, Heart } from "lucide-react";

const About: React.FC = () => {
  return (
    <Layout>
      <Banner 
        variant="about" 
        title="Sobre o Projeto" 
        subtitle="Conheça o RadioPos"
        bgColor="#00874A"
        color="#FFFFFF"
      />
      
      <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#00874A]">
            <Info className="w-5 h-5" />
            <h3 className="font-bold text-lg">O que é?</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            O <span className="font-bold text-[#00874A]">RadioPos</span> é um guia digital de bolso desenvolvido para auxiliar estudantes e profissionais de radiologia no posicionamento preciso de exames. 
            Nosso foco é oferecer uma ferramenta rápida, intuitiva e acessível em qualquer lugar.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#00874A]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-lg">Nossa Missão</h3>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 italic text-gray-700">
            "Facilitar o acesso ao conhecimento técnico radiológico, promovendo maior precisão nos diagnósticos por imagem e auxiliando na formação de novos profissionais."
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-gray-800">Recursos Principais</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Guia detalhado de posicionamentos por região.",
              "Busca rápida de incidências específicas.",
              "Lista de favoritos para acesso offline.",
              "Interface otimizada para dispositivos móveis."
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#00874A]" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Contato & Suporte</h3>
          <div className="flex flex-col gap-2">
            <a 
              href="mailto:suporte@radiopos.com" 
              className="flex items-center gap-3 p-3 text-gray-600 hover:text-[#00874A] hover:bg-green-50 rounded-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">suporte@radiopos.com</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 p-3 text-gray-600 hover:text-[#00874A] hover:bg-green-50 rounded-xl transition-all"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Repositório do Projeto</span>
            </a>
          </div>
        </section>

        <footer className="mt-8 flex flex-col items-center gap-2 text-gray-400">
          <div className="flex items-center gap-1 text-sm">
            Feito com <Heart className="w-4 h-4 text-red-400 fill-red-400" /> para a radiologia
          </div>
          <span className="text-xs">Versão 1.0.0 • 2026</span>
        </footer>
      </div>
    </Layout>
  );
};

export default About;
