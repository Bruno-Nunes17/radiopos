import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import IncidenceCard from "../components/IncidenceCard";
import { useData } from "../hooks/useData";
import Skeleton from "../components/Skeleton";
import NotFound from "./NotFound";

const iconMap: Record<string, string> = {
  "cranio": "/cranio.svg",
  "torax": "/torax.svg",
  "coluna": "/coluna.svg",
  "lombar": "/lombar.svg",
  "pelve": "/pelve.svg",
  "superiores": "/superiores.svg",
  "inferiores": "/inferiores.svg",
  "abdome": "/lombar.svg",
};

const getCategoryKey = (id: string, name: string): string => {
  const upperName = name.toUpperCase();
  if (upperName.includes("CRÂNIO")) return "cranio";
  if (upperName.includes("TÓRAX")) return "torax";
  if (upperName.includes("COLUNA")) return "coluna";
  if (upperName.includes("ABDÔMEN") || upperName.includes("ABDOME")) return "abdome";
  if (upperName.includes("PELVE")) return "pelve";
  if (upperName.includes("SUPERIORES")) return "superiores";
  if (upperName.includes("INFERIORES")) return "inferiores";
  return id;
};

const RegionSkeleton = () => (
  <Layout>
    <div className="w-full h-48 bg-gray-200 animate-pulse" />
    <div className="px-6 mt-12 flex flex-col gap-8 pb-10">
      {[1, 2].map((group) => (
        <div key={group} className="flex flex-col gap-4">
          <Skeleton className="h-6 w-40 mb-2" />
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-3 flex items-center gap-4 border border-black/5 animate-pulse">
                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Layout>
);

const RegionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useData();
  const [search, setSearch] = React.useState("");

  if (loading && !data) {
    return <RegionSkeleton />;
  }

  const region = data?.categories.find((r) => r.id === id);
  const regionIncidences = data?.incidences.filter((i) => i.subcategoria.categoria.id === id) || [];

  if (!region) {
    return <NotFound />;
  }

  const filteredIncidences = regionIncidences.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subcategoria.name.toLowerCase().includes(search.toLowerCase())
  );

  // Agrupar incidências por subcategoria
  const groupedIncidences = filteredIncidences.reduce((acc, incidence) => {
    const subcategory = incidence.subcategoria.name || "Geral";
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(incidence);
    return acc;
  }, {} as Record<string, typeof regionIncidences>);

  const subcategories = Object.keys(groupedIncidences);

  const key = getCategoryKey(region.id, region.name);
  const icon = iconMap[key] || "/favicon.svg";
  const color = region.color;
  const bgColor = region.colorBg;

  return (
    <Layout>
      <Banner
        variant="region"
        title={region.name}
        count={regionIncidences.length > 1 ? `${regionIncidences.length} incidências` : `${regionIncidences.length} incidência`}
        icon={icon}
        color={color}
        bgColor={bgColor}
        showSearch={true}
        searchPlaceholder={`Buscar em ${region.name}`}
        onSearch={setSearch}
      />

      <div className="px-6 mt-12 flex flex-col gap-8 pb-10">
        {regionIncidences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
              <span className="text-3xl text-gray-300">
                {icon ? (
                  <img src={icon} alt="" className="w-10 h-10 opacity-20 grayscale" />
                ) : "📋"}
              </span>
            </div>
            <h3 className="text-gray-500 font-medium text-lg">Nenhuma incidência</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-[250px]">
              Ainda não há incidências cadastradas para a região de {region.name}.
            </p>
          </div>
        ) : (
          <>
            {subcategories.map((subcat) => (
              <div key={subcat} className="flex flex-col gap-4">
                {subcategories.length > 1 && (
                  <h3 className="text-lg font-bold text-gray-800 border-l-4 pl-3" style={{ borderColor: color }}>
                    {subcat}
                  </h3>
                )}
                
                <div className="flex flex-col gap-4">
                  {groupedIncidences[subcat].map((item) => (
                    <IncidenceCard
                      key={item.id}
                      title={item.name}
                      subtitle={item.subcategoria.name}
                      icon={icon}
                      color={color}
                      bgColor={bgColor}
                      onClick={() => navigate(`/incidence/${item.id}`)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredIncidences.length === 0 && search && (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-300">
                <p className="text-gray-400">Nenhum resultado para "{search}"</p>
                <button 
                  onClick={() => setSearch("")}
                  className="mt-4 text-[#00874A] text-sm font-bold underline"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default RegionDetail;
