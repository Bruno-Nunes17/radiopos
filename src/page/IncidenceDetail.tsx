import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { X, ZoomIn, Play } from "lucide-react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { useData } from "../hooks/useData";

const IncidenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, toggleSave, isSaved: checkIsSaved, addToRecent } = useData();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const incidence = data?.incidences.find((i) => i.id === id);

  useEffect(() => {
    if (incidence) {
      addToRecent(incidence);
    }
  }, [id, incidence, addToRecent]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (loading && !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

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

  // Função para extrair ID do YouTube
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = incidence.youtubeLink ? getYouTubeId(incidence.youtubeLink) : null;

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

      <div className="w-full max-w-4xl mx-auto">
        <div className="px-6 mt-6 flex flex-col gap-6 pb-10">
          {/* Image Display */}
          {illustration ? (
             <div 
               className="w-full rounded-2xl overflow-hidden mt-5 shadow-md cursor-zoom-in relative group"
               onClick={() => setFullscreenImage(illustration.url)}
             >
               <img src={illustration.url} alt="Posicionamento" className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
               <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                 <ZoomIn className="w-5 h-5 text-white" />
               </div>
               {illustration.caption && (
                 <div className="bg-gray-100 p-2 text-xs text-gray-600 text-center">{illustration.caption}</div>
               )}
             </div>
          ) : (
            <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mt-5 px-5">
              <span className="text-gray-400 text-sm text-center">
                Imagem do Posicionamento não disponível
              </span>
            </div>
          )}

          {/* YouTube Video Player */}
          {isOnline && videoId && (
            <div className="w-full flex flex-col gap-3">
               {!showVideo ? (
                 <button 
                   onClick={() => setShowVideo(true)}
                   className="w-full py-4 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-2xl flex items-center justify-center gap-3 transition-all shadow-md font-bold active:scale-[0.98]"
                 >
                   <Play className="w-6 h-6 fill-current" />
                   Ver Vídeo Demonstrativo
                 </button>
               ) : (
                 <>
                   <div className="flex justify-between items-center">
                     <h3 className="text-[#555555] font-bold text-sm uppercase">
                       Vídeo Demonstrativo
                     </h3>
                     <button 
                       onClick={() => setShowVideo(false)}
                       className="text-[10px] font-bold text-[#FF0000] uppercase tracking-wider flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg"
                     >
                       <X className="w-3 h-3" />
                       Ocultar vídeo
                     </button>
                   </div>
                   <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-black animate-in zoom-in-95 duration-300">
                     <iframe
                       className="absolute inset-0 w-full h-full"
                       src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                       title={incidence.youtubeTitle || "Vídeo de Posicionamento"}
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                   </div>
                   {incidence.youtubeTitle && (
                     <p className="text-xs text-gray-500 italic text-center px-4">
                       {incidence.youtubeTitle}
                     </p>
                   )}
                 </>
               )}
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
                <span className="text-sm ">
                  {incidence.params?.centralRay || "--"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
                <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                  DFF
                </span>
                <span className="text-sm ">
                  {incidence.params?.ffd || "--"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
                <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                  KVp Sugerido
                </span>
                <span className="text-sm ">
                  {incidence.params?.kvp || "--"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border px-2 py-1 rounded-xl border-[#E5E5E0]">
                <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                  mAs Sugerido
                </span>
                <span className="text-sm ">
                  {typeof incidence.params?.mas === 'string' || typeof incidence.params?.mas === 'number' ? String(incidence.params.mas) : "--"}
                </span>
              </div>
              <div className="flex flex-col col-span-2 gap-1 w-full border px-2 py-1 rounded-xl border-[#E5E5E0]">
                <span className="text-[#999999] text-[10px] font-bold uppercase tracking-wider">
                  Chassis ou Cassete
                </span>
                <span className="text-sm ">
                  {incidence.params?.cassetteSize || "--"}
                </span>
              </div>
            </div>
          </div>

          {/* X-Ray Display */}
          {xray && (
             <div 
               className="w-full rounded-2xl overflow-hidden shadow-md cursor-zoom-in relative group"
               onClick={() => setFullscreenImage(xray.url)}
             >
               <img src={xray.url} alt="Radiografia" className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
               <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                 <ZoomIn className="w-5 h-5 text-white" />
               </div>
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
      </div>

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
          >
            <X className="w-8 h-8 text-white" />
          </button>
          
          <img 
            src={fullscreenImage} 
            alt="Tela cheia" 
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
          
          <p className="absolute bottom-10 text-white/60 text-sm font-medium">
            Toque fora da imagem para fechar
          </p>
        </div>
      )}
    </Layout>
  );
};

export default IncidenceDetail;
