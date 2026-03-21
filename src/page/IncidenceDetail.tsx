import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { incidences } from "../data/incidences";
import { regions } from "../data/regions";

const IncidenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const incidence = incidences.find((i) => i.id === id);
  const region = regions.find((r) => r.id === incidence?.regionId);

  if (!incidence || !region) {
    return (
      <Layout>
        <div className="p-6">Incidência não encontrada</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Banner
        variant="incidence"
        title={incidence.name}
        subtitle={incidence.subtitle}
        color={region.color}
        bgColor={region.bgColor}
      />

      <div className="px-6 mt-6 flex flex-col gap-6">
        {/* Image Placeholder */}
        <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mt-5 px-5">
          <span className="text-gray-400 text-sm">
            Imagem do Posicionamento
          </span>
        </div>

        {/* Positioning Section */}
        <div
          className="rounded-2xl p-5 shadow-sm border border-black/5"
          style={{ backgroundColor: region.bgColor }}
        >
          <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
            Posicionamento
          </h3>
          <p className="text-[#000000] text-sm leading-relaxed">
            {incidence.positioning || "Informação não disponível."}
          </p>
        </div>

        {/* Technique Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
          <h3 className="text-[#555555] font-bold text-sm mb-4 uppercase">
            Técnica Sugerida
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                Radio Central
              </span>
              <span
                className="text-[#1a5276] font-bold text-lg"
                style={{ color: region.color }}
              >
                {incidence.technique?.kvp || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                DFF
              </span>
              <span
                className="text-[#1a5276] font-bold text-lg"
                style={{ color: region.color }}
              >
                {incidence.technique?.mas || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                KVp Sugerido
              </span>
              <span
                className="text-[#1a5276] font-bold text-sm"
                style={{ color: region.color }}
              >
                {incidence.technique?.focus || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                Mas Sugerido
              </span>
              <span
                className="text-[#1a5276] font-bold text-sm"
                style={{ color: region.color }}
              >
                {incidence.technique?.distance || "--"}
              </span>
            </div>
            <div className="flex flex-col col-span-2  gap-1 w-full border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                Chassis ou Cassete
              </span>
              <span
                className="text-[#1a5276] font-bold text-sm"
                style={{ color: region.color }}
              >
                {incidence.technique?.distance || "--"}
              </span>
            </div>
          </div>
        </div>

        {/* Estructures Section */}
        <div
          className="rounded-2xl p-5 shadow-sm border border-black/5"
          style={{ backgroundColor: region.bgColor }}
        >
          <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
            Estruturas demonstradas
          </h3>
          <p className="text-[#000000] text-sm leading-relaxed">
            {incidence.positioning || "Informação não disponível."}
          </p>
        </div>

        {/* ava Section */}

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
          <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
            Critérios de avaliação{" "}
          </h3>
          <div className="flex gap-1">
            <div
              className="rounded-full w-fit h-fit px-3 py-1"
              style={{ backgroundColor: region.bgColor, color: region.color, borderColor: region.color}}
            >
              1
            </div>
            <p className="text-[#000000] text-sm leading-relaxed">
              {incidence.positioning || "Informação não disponível."}
            </p>
          </div>

          
        </div>

        <div className="bg-[#FAEEDA] rounded-2xl p-5 shadow-sm border border-black/5">
          <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
            Dica do técnico
          </h3>
          <p className="text-[#000000] text-sm leading-relaxed">
            {incidence.positioning || "Informação não disponível."}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default IncidenceDetail;
