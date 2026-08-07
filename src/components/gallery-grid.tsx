"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PortfolioImage } from "@/content/portfolio";
import {
  ImageScatter,
  type ScatterSet,
} from "@/components/ui/image-scatter";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { Lightbox } from "@/components/lightbox";

interface GalleryGridProps {
  images: PortfolioImage[];
}

const MOBILE_QUERY = "(max-width: 639px)";
const SET_ORDER = ["People", "Places", "Energy"] as const;

function toScatterSets(
  images: PortfolioImage[],
  maxPerSet: number,
): ScatterSet[] {
  return SET_ORDER.map((heading) => {
    const items = images
      .filter((image) => image.set === heading)
      .slice(0, maxPerSet)
      .map((image) => ({
        id: image.id,
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
      }));
    return { heading, images: items };
  }).filter((set) => set.images.length > 0);
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    function sync() {
      setIsMobile(media.matches);
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const data = useMemo(
    () => toScatterSets(images, isMobile ? 3 : Number.POSITIVE_INFINITY),
    [images, isMobile],
  );

  const size = isMobile ? 148 : 240;

  const handleImageClick = useCallback(
    (image: { id: string }) => {
      const index = images.findIndex((item) => item.id === image.id);
      if (index >= 0) setActiveIndex(index);
    },
    [images],
  );

  return (
    <>
      <section
        id="work"
        className="relative h-[100svh] min-h-[520px] scroll-mt-0 overflow-hidden bg-bg sm:min-h-[640px]"
        aria-label="candidd work"
      >
        <ImageScatter
          key={`${size}-${data.map((set) => set.images.length).join("-")}`}
          data={data}
          size={size}
          className="h-full w-full"
          onImageClick={handleImageClick}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full bg-gradient-to-t from-bg via-bg/70 to-transparent px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <h1 className="leading-none">
              <span className="sr-only">candidd</span>
              <FlipFadeText
                words={["candidd"]}
                className="justify-start"
                textClassName="font-display gap-[0.02em] text-[clamp(3.25rem,16vw,11rem)] font-normal normal-case leading-[0.85] tracking-[0.02em] text-fg md:text-[clamp(3.25rem,16vw,11rem)]"
                letterDuration={0.55}
                staggerDelay={0.07}
              />
            </h1>
            <p className="mt-3 max-w-md text-sm text-fg-muted sm:mt-4 sm:text-lg">
              Candid photography — moments as they land.
            </p>
          </div>
        </div>
      </section>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
