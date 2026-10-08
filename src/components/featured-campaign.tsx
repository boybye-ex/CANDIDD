"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Lightbox } from "@/components/lightbox";
import { cn } from "@/lib/utils";

export interface CampaignImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

interface FeaturedCampaignProps {
  title: string;
  subtitle?: string;
  images: CampaignImage[];
}

export function FeaturedCampaign({
  title,
  subtitle,
  images,
}: FeaturedCampaignProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [heroImage, ...gridImages] = images;

  const lightboxImages = images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.title,
    width: img.width,
    height: img.height,
    year: 2026,
    set: "Editorial" as const,
  }));

  return (
    <>
      <section
        ref={sectionRef}
        className="scroll-mt-16 bg-bg px-5 py-16 sm:px-8 sm:py-24"
        aria-labelledby="featured-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              "opacity-0",
              isVisible && "animate-fade-up opacity-100"
            )}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-accent">
              Featured
            </span>
            <h2
              id="featured-heading"
              className="mt-2 font-display text-4xl tracking-wide text-fg sm:text-5xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 max-w-md text-sm text-fg-muted sm:text-base">
                {subtitle}
              </p>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
            {/* Hero image - large, spans 7 columns on desktop */}
            <div
              className={cn(
                "lg:col-span-7 lg:row-span-2",
                "opacity-0",
                isVisible && "animate-fade-up opacity-100"
              )}
              style={isVisible ? { animationDelay: "0.1s" } : undefined}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className="group relative block aspect-[2/3] w-full overflow-hidden focus-visible:outline-offset-4"
                aria-label={`Open ${heroImage.title}`}
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 text-sm tracking-wide text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-6 sm:left-6 sm:text-base">
                  {heroImage.title}
                </span>
              </button>
            </div>

            {/* Grid images - 2x2 on desktop, 2-column on mobile */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-6">
              {gridImages.map((image, index) => (
                <div
                  key={image.id}
                  className={cn(
                    "opacity-0",
                    isVisible && "animate-fade-up opacity-100"
                  )}
                  style={
                    isVisible
                      ? { animationDelay: `${0.15 + index * 0.08}s` }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index + 1)}
                    className="group relative block aspect-[2/3] w-full overflow-hidden focus-visible:outline-offset-4"
                    aria-label={`Open ${image.title}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-2 left-2 text-xs tracking-wide text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-4 sm:left-4 sm:text-sm">
                      {image.title}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
