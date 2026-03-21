import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import IncidenceCard from "../components/IncidenceCard";
import { regions } from "../data/regions";
import { incidences, type Incidence } from "../data/incidences";

const RegionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const region = regions.find((r) => r.id === id);
  const regionIncidences = incidences.filter((i) => i.regionId === id);

  if (!region) {
    return (
      <Layout>
        <div className="p-6">Região não encontrada</div>
      </Layout>
    );
  }

  // Agrupar incidências por categoria
  const groupedIncidences = regionIncidences.reduce((acc, incidence) => {
    const category = incidence.category || "Geral";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(incidence);
    return acc;
  }, {} as Record<string, Incidence[]>);

  const categories = Object.keys(groupedIncidences);

  return (
    <Layout>
      <Banner
        variant="region"
        title={region.name}
        count={`${regionIncidences.length} incidências cadastradas`}
        icon={region.icon}
        color={region.color}
        bgColor={region.bgColor}
      />

      <div className="px-6 mt-12 flex flex-col gap-8 pb-10">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            {/* Título da Categoria (exibido apenas se houver categorias específicas ou se for Crânio) */}
            {(category !== "Geral" || categories.length > 1) && (
              <h3 className="text-lg font-bold text-gray-800 border-l-4 pl-3" style={{ borderColor: region.color }}>
                {category}
              </h3>
            )}
            
            <div className="flex flex-col gap-4">
              {groupedIncidences[category].map((item) => (
                <IncidenceCard
                  key={item.id}
                  title={item.name}
                  subtitle={item.subtitle}
                  tag={item.tag}
                  icon={region.icon}
                  color={region.color}
                  bgColor={region.bgColor}
                  onClick={() => navigate(`/incidence/${item.id}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default RegionDetail;
