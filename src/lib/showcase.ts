export const SPIN_FRAMES = Array.from({ length: 8 }, (_, i) => `/images/spin/${i}.png`);

export type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
};

// One stage per quarter turn of the car.
export const STAGES: Stage[] = [
  {
    id: "aero",
    label: "Aero",
    title: "Carving the Air",
    body: "The RB19's multi-element front wing starts the airflow journey. Downforce is so strong that, in theory, the car could drive upside down in a tunnel.",
    stat: "~3.5 G",
    statLabel: "cornering load",
  },
  {
    id: "power",
    label: "Power Unit",
    title: "Hybrid Heartbeat",
    body: "Under that engine cover sits a Honda RBPT 1.6-litre turbo V6 with energy recovery, among the most efficient engines ever built.",
    stat: "1,000 hp",
    statLabel: "combined output",
  },
  {
    id: "tyres",
    label: "Tyres",
    title: "Where Rubber Meets Road",
    body: "Pirelli slicks only work in a narrow temperature window, so races are often won by managing heat lap after lap.",
    stat: "100°C",
    statLabel: "operating temp",
  },
  {
    id: "halo",
    label: "Halo",
    title: "The Guardian",
    body: "The titanium halo, mandatory since 2018, can withstand loads equivalent to the weight of a London double-decker bus.",
    stat: "12 t",
    statLabel: "load tested",
  },
];
