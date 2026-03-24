import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import AnatomicalCard from "../components/AnatomicalCard";
import IncidenceCard from "../components/IncidenceCard";
import { useData } from "../hooks/useData";
import Skeleton from "../components/Skeleton";

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

const HomeSkeleton = () => (
  <Layout>
    <div className="w-full h-48 bg-gray-200 animate-pulse" />
    <div className="px-6 mt-8">
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="grid grid-cols-2 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl p-4 flex flex-col gap-3 bg-gray-100 border border-black/5 animate-pulse">
            <Skeleton className="w-15 h-15 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="px-6 mt-10 pb-10">
      <Skeleton className="h-4 w-48 mb-4" />
      <div className="flex flex-col gap-3">
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
  </Layout>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, recentIncidences } = useData();

  if (loading && !data) {
    return <HomeSkeleton />;
  }

  const categories = data?.categories || [];
  const incidences = data?.incidences || [];

  return (
    <Layout>
      <Banner variant="home" showSearch={false} />

      {/* Anatomical Regions Section */}
      <div className="px-6 mt-8 flex flex-col items-start">
        <h3 className="text-[#555555] font-semibold mb-4 text-sm uppercase">
          Regiões anatômicas
        </h3>

        <div className="grid grid-cols-2 gap-4 w-full">
          {categories.map((category) => {
            const key = getCategoryKey(category.id, category.name);
            return (
              <AnatomicalCard
                key={category.id}
                name={category.name}
                count={incidences.filter(i => i.subcategoria.categoria.id === category.id).length}
                icon={iconMap[key] || "/favicon.svg"}
                bgColor={category.colorBg}
                onClick={() => navigate(`/region/${category.id}`)}
              />
            );
          })}
        </div>
      </div>

      {/* Recently Accessed Section */}
      {recentIncidences.length > 0 && (
        <div className="px-6 mt-10 pb-10">
          <h3 className="text-[#555555] font-semibold mb-4 text-sm uppercase">
            Acessados recentemente
          </h3>

          <div className="flex flex-col gap-3">
            {recentIncidences.map((item) => {
              const category = item.subcategoria.categoria;
              const key = getCategoryKey(category.id, category.name);
              return (
                <IncidenceCard
                  key={item.id}
                  title={item.name}
                  subtitle={category.name}
                  icon={iconMap[key] || "/favicon.svg"}
                  color={category.color}
                  bgColor={category.colorBg}
                  onClick={() => navigate(`/incidence/${item.id}`)}
                />
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
