import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
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

const Saved: React.FC = () => {
  const navigate = useNavigate();
  const { savedIncidences } = useData();
  const [search, setSearch] = useState("");

  const filteredIncidences = savedIncidences.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subcategoria.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Banner variant="saved" showSearch={true} onSearch={setSearch} />

      <div className="px-6 mt-8 pb-10">
        {savedIncidences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-gray-300">★</span>
            </div>
            <h3 className="text-gray-500 font-medium">Nenhuma incidência salva</h3>
            <p className="text-gray-400 text-sm mt-2">As incidências que você marcar como favoritas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             {filteredIncidences.map((item) => {
                const category = item.subcategoria.categoria;
                const key = getCategoryKey(category.id, category.name);
                return (
                  <IncidenceCard
                    key={item.id}
                    title={item.name}
                    subtitle={item.subcategoria.name}
                    icon={iconMap[key] || "/favicon.svg"}
                    color={category.color}
                    bgColor={category.colorBg}
                    onClick={() => navigate(`/incidence/${item.id}`)}
                  />
                );
             })}
             {filteredIncidences.length === 0 && search && (
               <p className="text-center text-gray-400 mt-10">Nenhum resultado para "{search}"</p>
             )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Saved;
