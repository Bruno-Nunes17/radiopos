export interface Incidence {
  id: string;
  regionId: string;
  category?: string;
  name: string;
  subtitle: string;
  tag: string;
  description?: string;
  positioning?: string;
  technique?: {
    kvp: string;
    mas: string;
    focus: string;
    distance: string;
  };
  image?: string;
}

export const incidences: Incidence[] = [
  {
    id: "cranio-pa-caldwell",
    regionId: "cranio",
    category: "Crânio",
    name: "Crânio PA — Caldwell",
    subtitle: "PA em pé ou sentado",
    tag: "70-80 KVp",
    positioning: "O paciente deve estar em decúbito ventral ou sentado, com a fronte e o nariz encostados no bucky. O RC é direcionado 15° caudal, saindo no násio.",
    technique: {
      kvp: "75",
      mas: "20",
      focus: "Fino",
      distance: "100cm",
    }
  },
  {
    id: "cranio-perfil",
    regionId: "cranio",
    category: "Crânio",
    name: "Crânio Perfil",
    subtitle: "Ortostático ou Decúbito",
    tag: "70-80 KVp",
    positioning: "Paciente em perfil verdadeiro. Linha interpupilar perpendicular ao filme.",
    technique: {
      kvp: "75",
      mas: "15",
      focus: "Fino",
      distance: "100cm",
    }
  },
  {
    id: "cranio-ap-towne",
    regionId: "cranio",
    category: "Crânio",
    name: "Crânio AP — Towne",
    subtitle: "AP em pé ou deitado",
    tag: "75-85 KVp",
    positioning: "OML perpendicular ao filme. RC 30° caudal (OML) ou 37° caudal (IOML).",
    technique: {
      kvp: "80",
      mas: "25",
      focus: "Fino",
      distance: "100cm",
    }
  },
  {
    id: "face-waters",
    regionId: "cranio",
    category: "Ossos da Face",
    name: "Mento-Naso — Waters",
    subtitle: "Seios da Face",
    tag: "75-85 KVp",
    positioning: "Mento encostado no bucky, nariz a 1-2cm. RC perpendicular ao filme saindo no acântio.",
  },
  {
    id: "face-perfil",
    regionId: "cranio",
    category: "Ossos da Face",
    name: "Ossos da Face Perfil",
    subtitle: "Unilateral",
    tag: "65-75 KVp",
    positioning: "Paciente em perfil verdadeiro, RC perpendicular saindo no osso zigomático.",
  },
  {
    id: "torax-pa",
    regionId: "torax",
    name: "Tórax PA",
    subtitle: "Ortostático",
    tag: "110-120 KVp",
  },
  {
    id: "torax-perfil",
    regionId: "torax",
    name: "Tórax Perfil",
    subtitle: "Ortostático",
    tag: "120-130 KVp",
  }
];
