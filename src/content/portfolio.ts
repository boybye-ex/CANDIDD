export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  year: number;
  width: number;
  height: number;
  set: "People" | "Places" | "Energy";
}

/**
 * Local portfolio assets in /public/portfolio.
 * Drop your own JPGs with the same filenames (or update paths) when ready.
 *
 * Groups:
 * - People: 01, 02, 04, 06, 09, 11, 12
 * - Places: hero, 03, 05, 10
 * - Energy: 07, 08, 13, 14
 *
 * width/height must match the files (used for layout + Next image props).
 */
export const portfolio: PortfolioImage[] = [
  {
    id: "hero",
    src: "/portfolio/hero.jpg",
    alt: "Crowd silhouettes under stage light at a live event",
    title: "After Hours",
    year: 2025,
    width: 2400,
    height: 1602,
    set: "Places",
  },
  {
    id: "01",
    src: "/portfolio/01.jpg",
    alt: "Friends laughing together outdoors in warm evening light",
    title: "Golden Hour",
    year: 2025,
    width: 1600,
    height: 900,
    set: "People",
  },
  {
    id: "02",
    src: "/portfolio/02.jpg",
    alt: "Couple embracing in soft window light",
    title: "Quiet Frame",
    year: 2024,
    width: 1600,
    height: 2400,
    set: "People",
  },
  {
    id: "03",
    src: "/portfolio/03.jpg",
    alt: "Sunlight breaking through mountain mist",
    title: "Passage",
    year: 2024,
    width: 1600,
    height: 1063,
    set: "Places",
  },
  {
    id: "04",
    src: "/portfolio/04.jpg",
    alt: "Portrait of a man looking slightly off camera",
    title: "Still",
    year: 2025,
    width: 1600,
    height: 2400,
    set: "People",
  },
  {
    id: "05",
    src: "/portfolio/05.jpg",
    alt: "City street at dusk with traffic light trails",
    title: "Night Drive",
    year: 2024,
    width: 1600,
    height: 1067,
    set: "Places",
  },
  {
    id: "06",
    src: "/portfolio/06.jpg",
    alt: "Close portrait of a woman with natural soft light",
    title: "Soft Edge",
    year: 2025,
    width: 1600,
    height: 2000,
    set: "People",
  },
  {
    id: "07",
    src: "/portfolio/07.jpg",
    alt: "People celebrating together with raised hands",
    title: "Together",
    year: 2024,
    width: 1600,
    height: 1067,
    set: "Energy",
  },
  {
    id: "08",
    src: "/portfolio/08.jpg",
    alt: "Concert crowd under dramatic stage lighting",
    title: "Pulse",
    year: 2025,
    width: 1600,
    height: 1067,
    set: "Energy",
  },
  {
    id: "09",
    src: "/portfolio/09.jpg",
    alt: "Woman with short hair looking toward the camera",
    title: "Present",
    year: 2024,
    width: 1600,
    height: 1067,
    set: "People",
  },
  {
    id: "10",
    src: "/portfolio/10.jpg",
    alt: "Mountain peaks above clouds at sunrise",
    title: "Above",
    year: 2024,
    width: 1600,
    height: 1067,
    set: "Places",
  },
  {
    id: "11",
    src: "/portfolio/11.jpg",
    alt: "Portrait of a woman smiling softly against a warm background",
    title: "Warmth",
    year: 2025,
    width: 1600,
    height: 2400,
    set: "People",
  },
  {
    id: "12",
    src: "/portfolio/12.jpg",
    alt: "Woman with braids and glasses smiling at a nighttime outdoor event",
    title: "Night Smile",
    year: 2026,
    width: 960,
    height: 1280,
    set: "People",
  },
  {
    id: "13",
    src: "/portfolio/13.jpg",
    alt: "Woman laughing under a patio umbrella at a sunny outdoor gathering",
    title: "Mid Laugh",
    year: 2026,
    width: 1066,
    height: 1600,
    set: "Energy",
  },
  {
    id: "14",
    src: "/portfolio/14.jpg",
    alt: "Woman with short hair sticking her tongue out at a daytime outdoor event",
    title: "Play",
    year: 2026,
    width: 1066,
    height: 1600,
    set: "Energy",
  },
];

export const ogImage = portfolio[0];

export const shootTypes = [
  "Portrait",
  "Event",
  "Documentary",
  "Editorial",
  "Other",
] as const;

export type ShootType = (typeof shootTypes)[number];

export const portfolioSets = ["People", "Places", "Energy"] as const;

export type PortfolioSet = (typeof portfolioSets)[number];

export function getImageById(id: string) {
  return portfolio.find((image) => image.id === id);
}
