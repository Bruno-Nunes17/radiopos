import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import IncidenceCard from "../components/IncidenceCard";
import { incidences } from "../data/incidences";
import { regions } from "../data/regions";

const Saved: React.FC = () => {
  const navigate = useNavigate();
  
  // For now, let's just show some incidences as "saved"
  const savedIncidences = incidences.slice(0, 2);

  return (
    <Layout>
      <Banner
        variant="saved"
      />

      <div className="px-6 mt-12 flex flex-col gap-4">
        {savedIncidences.length > 0 ? (
          savedIncidences.map((item) => {
            const region = regions.find((r) => r.id === item.regionId);
            return (
              <IncidenceCard
                key={item.id}
                title={item.name}
                subtitle={region?.name}
                tag={item.tag}
                icon={region?.icon}
                color={region?.color || "#00874a"}
                bgColor={region?.bgColor || "rgba(0, 135, 74, 0.15)"}
                onClick={() => navigate(`/incidence/${item.id}`)}
              />
            );
          })
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center text-gray-400 gap-2">
            <p>Nenhuma incidência salva.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Saved;
