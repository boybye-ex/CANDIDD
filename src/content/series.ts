/**
 * Photo Series Data
 *
 * This file drives all photo series galleries. To add a new series:
 * 1. Create a folder under /public/series/<series-slug>/
 * 2. Add optimized WebP images to that folder
 * 3. Add a new PhotoSeries entry below with images array
 *
 * See /docs/ADDING-PHOTOS.md for detailed instructions.
 */

export interface SeriesImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
  featured?: boolean;
}

export interface PhotoSeries {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  year: number;
  coverImage: string;
  images: SeriesImage[];
}

export const photoSeries: PhotoSeries[] = [
  {
    slug: "poedagar-watch",
    title: "Poedagar",
    subtitle: "Rose-gold watch product shoot",
    description:
      "Product photography for the Poedagar timepiece featuring a rose-gold case, brushed blue dial with sunburst texture, and luminous indices. Macro details highlight the craftsmanship.",
    year: 2026,
    coverImage: "/series/poedagar-watch/dial-closeup.webp",
    images: [
      {
        id: "dial-closeup",
        src: "/series/poedagar-watch/dial-closeup.webp",
        alt: "Poedagar watch dial close-up showing rose-gold indices and hands against brushed blue sunburst dial",
        width: 941,
        height: 1672,
        category: "dial",
        featured: true,
      },
      {
        id: "side-profile",
        src: "/series/poedagar-watch/side-profile.webp",
        alt: "Side profile of Poedagar watch showing polished rose-gold case and bracelet with dramatic lighting",
        width: 941,
        height: 1672,
        category: "case",
        featured: true,
      },
      {
        id: "lume-glow",
        src: "/series/poedagar-watch/lume-glow.webp",
        alt: "Poedagar watch dial glowing in low light with green luminous indices and hands",
        width: 941,
        height: 1672,
        category: "dial",
      },
      {
        id: "dial-daylight",
        src: "/series/poedagar-watch/dial-daylight.webp",
        alt: "Poedagar watch dial in natural light showing brushed blue texture and gold applied indices",
        width: 941,
        height: 1672,
        category: "dial",
      },
      {
        id: "date-window",
        src: "/series/poedagar-watch/date-window.webp",
        alt: "Macro detail of Poedagar date window at 3 o'clock with brushed dial texture",
        width: 941,
        height: 1672,
        category: "detail",
      },
      {
        id: "crown-detail",
        src: "/series/poedagar-watch/crown-detail.webp",
        alt: "Close-up of Poedagar crown with knurled grip and engraved shield logo",
        width: 941,
        height: 1672,
        category: "detail",
      },
    ],
  },
  {
    slug: "one-piece-three-looks",
    title: "One Piece, Three Looks",
    subtitle: "Gold teardrop earrings with crystal spheres",
    description:
      "A styling campaign showcasing versatile gold teardrop earrings with clear crystal balls. One piece, styled three ways: Everyday Casual, Evening Elevated, and Soft Luxe Neutrals.",
    year: 2026,
    coverImage: "/series/one-piece-three-looks/product-stone.webp",
    images: [
      // Product shots (featured for home preview)
      {
        id: "product-stone",
        src: "/series/one-piece-three-looks/product-stone.webp",
        alt: "Gold teardrop earrings with crystal spheres resting on sunlit travertine stone",
        width: 1024,
        height: 1536,
        category: "product",
        featured: true,
      },
      {
        id: "hand-holding",
        src: "/series/one-piece-three-looks/hand-holding.webp",
        alt: "Hand delicately holding a gold teardrop earring with crystal sphere, model wearing matching pair",
        width: 941,
        height: 1672,
        category: "product",
      },

      // Everyday Casual - white tee, jeans (featured)
      {
        id: "walking-coffee-casual",
        src: "/series/one-piece-three-looks/walking-coffee-casual.webp",
        alt: "Model in white tee and jeans walking with coffee, gold earrings catching the light",
        width: 941,
        height: 1671,
        category: "everyday",
        featured: true,
      },
      {
        id: "cafe-laptop",
        src: "/series/one-piece-three-looks/cafe-laptop.webp",
        alt: "Model working at a cafe with laptop and iced coffee, wearing gold teardrop earrings",
        width: 941,
        height: 1672,
        category: "everyday",
      },
      {
        id: "portrait-casual",
        src: "/series/one-piece-three-looks/portrait-casual.webp",
        alt: "Close portrait of model in white tee with gold earrings and tortoiseshell sunglasses",
        width: 941,
        height: 1672,
        category: "everyday",
      },
      {
        id: "ear-closeup-casual",
        src: "/series/one-piece-three-looks/ear-closeup-casual.webp",
        alt: "Detail shot of gold teardrop earring with crystal sphere on model's ear",
        width: 941,
        height: 1672,
        category: "everyday",
      },

      // Evening Elevated - black top, martini (featured)
      {
        id: "martini-bar",
        src: "/series/one-piece-three-looks/martini-bar.webp",
        alt: "Model in black halter top sipping martini at an upscale bar, gold earrings glinting in warm light",
        width: 941,
        height: 1672,
        category: "evening",
        featured: true,
      },

      // Soft Luxe Neutrals - beige linen suit (featured)
      {
        id: "back-view-blazer",
        src: "/series/one-piece-three-looks/back-view-blazer.webp",
        alt: "Back view of model in beige linen blazer, gold earring visible against curly hair",
        width: 941,
        height: 1672,
        category: "softluxe",
        featured: true,
      },
      {
        id: "reading-book",
        src: "/series/one-piece-three-looks/reading-book.webp",
        alt: "Model in beige suit reading a book outdoors, gold earrings complementing the neutral palette",
        width: 941,
        height: 1672,
        category: "softluxe",
      },
      {
        id: "portrait-softluxe",
        src: "/series/one-piece-three-looks/portrait-softluxe.webp",
        alt: "Close portrait of model in beige blazer, gold earring detail visible",
        width: 941,
        height: 1672,
        category: "softluxe",
      },
      {
        id: "walking-coffee-softluxe",
        src: "/series/one-piece-three-looks/walking-coffee-softluxe.webp",
        alt: "Model in full beige linen suit walking with coffee, burgundy bag, gold earrings",
        width: 941,
        height: 1672,
        category: "softluxe",
      },

      // Editorial posters and collages
      {
        id: "title-poster",
        src: "/series/one-piece-three-looks/title-poster.webp",
        alt: "One Piece Three Looks campaign poster featuring product shot with styling tagline",
        width: 941,
        height: 1672,
        category: "editorial",
        featured: true,
      },
      {
        id: "three-looks-comparison",
        src: "/series/one-piece-three-looks/three-looks-comparison.webp",
        alt: "Side-by-side comparison of three looks: Everyday Casual, Evening Elevated, Soft Luxe Neutrals",
        width: 1024,
        height: 1536,
        category: "editorial",
      },
      {
        id: "lookbook-grid",
        src: "/series/one-piece-three-looks/lookbook-grid.webp",
        alt: "Editorial lookbook grid showcasing all three styling directions",
        width: 1024,
        height: 1536,
        category: "editorial",
      },
      {
        id: "evening-collage",
        src: "/series/one-piece-three-looks/evening-collage.webp",
        alt: "Multi-panel collage of Evening Elevated look with martini and bar ambiance",
        width: 941,
        height: 1672,
        category: "editorial",
      },
      {
        id: "putting-on-earring",
        src: "/series/one-piece-three-looks/putting-on-earring.webp",
        alt: "Three-panel sequence of model putting on gold teardrop earring",
        width: 941,
        height: 1671,
        category: "editorial",
      },
    ],
  },
];

export function getSeriesBySlug(slug: string): PhotoSeries | undefined {
  return photoSeries.find((s) => s.slug === slug);
}

export function getFeaturedImages(series: PhotoSeries): SeriesImage[] {
  return series.images.filter((img) => img.featured);
}

export function getImagesByCategory(
  series: PhotoSeries,
  category: string
): SeriesImage[] {
  return series.images.filter((img) => img.category === category);
}
