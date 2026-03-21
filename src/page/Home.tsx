import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import AnatomicalCard from "../components/AnatomicalCard";
import IncidenceCard from "../components/IncidenceCard";
import { regions } from "../data/regions";
import { incidences } from "../data/incidences";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Get some "recently accessed" items
  const recent = incidences.slice(0, 2).map(i => ({
    ...i,
    region: regions.find(r => r.id === i.regionId)
  }));

  return (
    <Layout>
      <Banner variant="home" />

      {/* Anatomical Regions Section */}
      <div className="px-6 mt-8 flex flex-col items-start">
        <h3 className="text-[#555555] font-semibold mb-4 text-sm uppercase">
          Regiões anatômicas
        </h3>

        <div className="grid grid-cols-2 gap-4 w-full">
          {regions.map((region) => (
            <AnatomicalCard
              key={region.id}
              name={region.name}
              count={region.count}
              icon={region.icon}
              bgColor={region.bgColor}
              onClick={() => navigate(`/region/${region.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Recently Accessed Section */}
      <div className="px-6 mt-10">
        <h3 className="text-[#555555] font-semibold mb-4 text-sm uppercase">
          Acessados recentemente
        </h3>

        <div className="flex flex-col gap-3">
          {recent.map((item) => (
            <IncidenceCard
              key={item.id}
              title={item.name}
              subtitle={item.region?.name}
              icon={item.region?.icon}
              color={item.region?.color || "#00874a"}
              bgColor={item.region?.bgColor || "rgba(0, 135, 74, 0.15)"}
              onClick={() => navigate(`/incidence/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
