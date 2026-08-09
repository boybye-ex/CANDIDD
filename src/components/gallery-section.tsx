"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioImage } from "@/content/portfolio";
import { Lightbox } from "@/components/lightbox";
import { cn } from "@/lib/utils";

interface GallerySectionProps {
  images: PortfolioImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set());
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const nodes = [...itemRefs.current.values()];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = (entry.target as HTMLElement).dataset.imageId;
            if (id) next.add(id);
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [images]);

  const setItemRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  const galleryImages = images.filter((image) => image.id !== "hero");

  return (
    <>
      <section
        id="work"
        className="scroll-mt-16 px-5 py-16 sm:px-8 sm:py-24"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="work-heading"
            className="font-display text-4xl tracking-wide text-fg sm:text-5xl"
          >
            Work
          </h2>
          <p className="mt-3 max-w-md text-sm text-fg-muted sm:text-base">
            Frames from people, places, and nights that stay with you.
          </p>

          <ul className="mt-10 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
            {galleryImages.map((image, index) => {
              const isVisible = visibleIds.has(image.id);
              return (
                <li
                  key={image.id}
                  ref={(node) => setItemRef(image.id, node)}
                  data-image-id={image.id}
                  className={cn(
                    "mb-4 break-inside-avoid sm:mb-5 lg:mb-6",
                    "motion-safe-hidden opacity-0",
                    isVisible && "animate-fade-up opacity-100",
                  )}
                  style={
                    isVisible
                      ? { animationDelay: `${Math.min(index % 6, 5) * 0.08}s` }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => {
                      const fullIndex = images.findIndex(
                        (item) => item.id === image.id,
                      );
                      if (fullIndex >= 0) setActiveIndex(fullIndex);
                    }}
                    className="group relative block w-full text-left focus-visible:outline-offset-4"
                    aria-label={`Open ${image.title}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="mt-2 block text-xs tracking-wide text-fg-muted sm:text-sm">
                      {image.title}
                      <span className="text-fg-muted/70"> · {image.set}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
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
