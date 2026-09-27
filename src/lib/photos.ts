export type Photo = {
  src: string;
  alt: string;
  author: string;
  license: "CC BY-SA 4.0" | "CC BY-SA 2.0" | "CC0";
  file: string;
  /** Set when the original photo was modified. */
  edit?: string;
};

const STUDIO_EDIT = "used as the reference for the AI-generated turntable views";

export const LICENSE_URLS: Record<Photo["license"], string> = {
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
};

export const commonsUrl = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

export const PHOTOS = {
  hero: {
    src: "/images/real/hero-rb19.jpg",
    alt: "Max Verstappen driving the Red Bull RB19 at the 2023 Austrian Grand Prix",
    author: "Lukas Raich",
    license: "CC BY-SA 4.0",
    file: "FIA F1 Austria 2023 Nr. 1 (1).jpg",
  },
  alfa158: {
    src: "/images/real/1950-alfa-158.jpg",
    alt: "The 1950 Alfa Romeo 158 Alfetta on display at the Alfa Romeo museum",
    author: "azrhey",
    license: "CC BY-SA 2.0",
    file: "Alfa Romeo 158 Alfetta 1950 Museo Storico OCT 2015.jpg",
  },
  m23: {
    src: "/images/real/1976-mclaren-m23.jpg",
    alt: "James Hunt racing the McLaren M23 at the 1976 British Grand Prix",
    author: "50DAG2026",
    license: "CC BY-SA 4.0",
    file: "McLaren James Hunt UKgp76.jpg",
  },
  mp44: {
    src: "/images/real/1988-mclaren-mp4-4.jpg",
    alt: "The 1988 McLaren-Honda MP4/4",
    author: "Calreyn88",
    license: "CC0",
    file: "1988 McLaren MP4-4 1.jpg",
  },
  rb6: {
    src: "/images/real/2010-red-bull-rb6.jpg",
    alt: "The 2010 Red Bull RB6 in the paddock",
    author: "Calreyn88",
    license: "CC BY-SA 4.0",
    file: "2010 Red Bull RB6.jpg",
  },
  rb19: {
    src: "/images/real/2023-red-bull-rb19.jpg",
    alt: "Max Verstappen's Red Bull RB19 at the 2023 Austrian Grand Prix",
    author: "Lukas Raich",
    license: "CC BY-SA 4.0",
    file: "FIA F1 Austria 2023 Nr. 1 (3).jpg",
  },
  mcl38: {
    src: "/images/real/2024-mclaren-mcl38.jpg",
    alt: "Lando Norris driving the McLaren MCL38 at the 2024 Austrian Grand Prix",
    author: "Lukas Raich",
    license: "CC BY-SA 4.0",
    file: "FIA F1 Austria 2024 Nr. 4 Norris.jpg",
  },
  rb20: {
    src: "/images/real/rival-red-bull-rb20.jpg",
    alt: "Max Verstappen driving the Red Bull RB20 in 2024",
    author: "Cineyas",
    license: "CC BY-SA 4.0",
    file: "Max Verstappen in the RB20.jpg",
  },
  mcl38Suzuka: {
    src: "/images/real/rival-mclaren-mcl38.jpg",
    alt: "The McLaren MCL38 at speed during the 2024 Japanese Grand Prix",
    author: "Cineyas",
    license: "CC BY-SA 4.0",
    file: "MCL38 during the Japanese Grand Prix.jpg",
  },
  machineAero: {
    src: "/images/machine/aero.png",
    alt: "Red Bull RB19 front wing, low front three-quarter view",
    author: "Calreyn88",
    license: "CC BY-SA 4.0",
    file: "2023 Red Bull RB19.jpg",
    edit: STUDIO_EDIT,
  },
  machineHalo: {
    src: "/images/machine/halo.png",
    alt: "Red Bull RB19 showing the halo and cockpit",
    author: "TaurusEmerald",
    license: "CC BY-SA 4.0",
    file: "Max Verstappen Red Bull RB19 Petersen Automotive Museum.jpg",
    edit: STUDIO_EDIT,
  },
  machinePower: {
    src: "/images/machine/power.png",
    alt: "Red Bull RB19 rear three-quarter view showing the engine cover",
    author: "Tokumeigakarinoaoshima",
    license: "CC BY-SA 4.0",
    file: "Osaka Auto Messe 2024 (137) - RedBull Racing RB19 showcar (2023 color).jpg",
    edit: STUDIO_EDIT,
  },
  machineTyres: {
    src: "/images/machine/tyres.png",
    alt: "Red Bull RB19 front three-quarter view showing the Pirelli tyres",
    author: "Tokumeigakarinoaoshima",
    license: "CC BY-SA 4.0",
    file: "Osaka Auto Messe 2024 (136) - RedBull Racing RB19 showcar (2023 color).jpg",
    edit: STUDIO_EDIT,
  },
} satisfies Record<string, Photo>;
