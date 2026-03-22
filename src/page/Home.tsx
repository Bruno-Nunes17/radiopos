import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import AnatomicalCard from "../components/AnatomicalCard";
import IncidenceCard from "../components/IncidenceCard";
import { useData } from "../hooks/useData";

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, recentIncidences } = useData();

  if (loading && !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
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
