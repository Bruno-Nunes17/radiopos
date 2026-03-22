import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { useData } from "../hooks/useData";

const IncidenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, toggleSave, isSaved: checkIsSaved } = useData();

  if (loading && !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  const incidence = data?.incidences.find((i) => i.id === id);
  
  if (!incidence) {
    return (
      <Layout>
        <div className="p-6">Incidência não encontrada</div>
      </Layout>
    );
  }

  const category = incidence.subcategoria.categoria;
  const color = category.color;
  const bgColor = category.colorBg;
  
  const isSaved = checkIsSaved(incidence.id);

  // Encontrar imagem do posicionamento (tipo 'illustration' ou 'xray')
  const illustration = incidence.medias?.find(m => m.type === 'illustration');
  const xray = incidence.medias?.find(m => m.type === 'xray');

  return (
    <Layout>
      <Banner
        variant="incidence"
        title={incidence.name}
        subtitle={incidence.subcategoria.name}
        color={color}
        bgColor={bgColor}
        isSaved={isSaved}
        onToggleSave={() => toggleSave(incidence)}
      />

      <div className="px-6 mt-6 flex flex-col gap-6 pb-10">
        {/* Image Display */}
        {illustration ? (
           <div className="w-full rounded-2xl overflow-hidden mt-5 shadow-md">
             <img src={illustration.url} alt="Posicionamento" className="w-full h-auto object-cover" />
             {illustration.caption && (
               <div className="bg-gray-100 p-2 text-xs text-gray-600 text-center">{illustration.caption}</div>
             )}
           </div>
        ) : (
          <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mt-5 px-5">
            <span className="text-gray-400 text-sm">
              Imagem do Posicionamento não disponível
            </span>
          </div>
        )}

        {/* Positioning Section */}
        <div
          className="rounded-2xl p-5 shadow-sm border border-black/5"
          style={{ backgroundColor: bgColor }}
        >
          <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
            Posicionamento
          </h3>
          <p className="text-[#000000] text-sm leading-relaxed">
            {incidence.position || "Informação não disponível."}
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
                Raio Central
              </span>
              <span className="text-lg font-bold" style={{ color: color }}>
                {incidence.params?.centralRay || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                DFF
              </span>
              <span className="text-lg font-bold" style={{ color: color }}>
                {incidence.params?.ffd || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                KVp Sugerido
              </span>
              <span className="text-sm font-bold" style={{ color: color }}>
                {incidence.params?.kvp || "--"}
              </span>
            </div>
            <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                mAs Sugerido
              </span>
              <span className="text-sm font-bold" style={{ color: color }}>
                {typeof incidence.params?.mas === 'string' || typeof incidence.params?.mas === 'number' ? String(incidence.params.mas) : "--"}
              </span>
            </div>
            <div className="flex flex-col col-span-2 gap-1 w-full border px-2 py-1 rounded-xl border-[#E5E5E0]">
              <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                Chassis ou Cassete
              </span>
              <span className="text-sm font-bold" style={{ color: color }}>
                {incidence.params?.cassetteSize || "--"}
              </span>
            </div>
          </div>
        </div>

        {/* X-Ray Display */}
        {xray && (
           <div className="w-full rounded-2xl overflow-hidden shadow-md">
             <img src={xray.url} alt="Radiografia" className="w-full h-auto object-cover" />
             {xray.caption && (
               <div className="bg-gray-100 p-2 text-xs text-gray-600 text-center">{xray.caption}</div>
             )}
           </div>
        )}

        {/* Structures Section */}
        {incidence.structures && (
          <div
            className="rounded-2xl p-5 shadow-sm border border-black/5"
            style={{ backgroundColor: bgColor }}
          >
            <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
              Estruturas demonstradas
            </h3>
            <p className="text-[#000000] text-sm leading-relaxed">
              {incidence.structures}
            </p>
          </div>
        )}

        {/* Criteria Section */}
        {incidence.criteria && incidence.criteria.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
            <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
              Critérios de avaliação
            </h3>
            <div className="flex flex-col gap-4">
              {incidence.criteria.map((criterion, idx) => (
                <div key={criterion.id} className="flex gap-3">
                  <div
                    className="rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ backgroundColor: bgColor, color: color }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-[#000000] text-sm leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Tip Section */}
        {incidence.techTip && (
          <div className="bg-[#FAEEDA] rounded-2xl p-5 shadow-sm border border-black/5">
            <h3 className="text-[#555555] font-bold text-sm mb-3 uppercase">
              Dica do técnico
            </h3>
            <p className="text-[#000000] text-sm leading-relaxed">
              {incidence.techTip}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IncidenceDetail;
