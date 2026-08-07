"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface ScatterImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface ScatterSet {
  heading: string;
  images: ScatterImage[];
}

export interface ImageScatterProps {
  data: ScatterSet[];
  /** Longest edge of each frame in CSS pixels. */
  size?: number;
  animationDuration?: number;
  animationOverlap?: number;
  headingFadeDuration?: number;
  onImageClick?: (image: ScatterImage, setHeading: string) => void;
  className?: string;
}

interface ScatterCard {
  element: HTMLButtonElement;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

function fitLongEdge(
  intrinsicW: number,
  intrinsicH: number,
  size: number,
): { width: number; height: number } {
  const ratio = intrinsicW / intrinsicH;
  if (ratio >= 1) {
    return { width: size, height: Math.max(1, Math.round(size / ratio)) };
  }
  return { width: Math.max(1, Math.round(size * ratio)), height: size };
}

export function ImageScatter({
  data,
  size = 240,
  animationDuration = 0.75,
  animationOverlap = 0.5,
  headingFadeDuration = 0.5,
  onImageClick,
  className,
}: ImageScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const onImageClickRef = useRef(onImageClick);
  onImageClickRef.current = onImageClick;

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current || !headingRef.current || data.length === 0)
      return;

    const gallery = galleryRef.current;
    const galleryHeading = headingRef.current;

    function getScatterRange() {
      if (!containerRef.current) return { rangeMin: 0, rangeMax: 0 };
      const shortest = Math.min(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      const isNarrow = containerRef.current.clientWidth < 640;
      return {
        rangeMin: shortest * (isNarrow ? 0.18 : 0.35),
        rangeMax: shortest * (isNarrow ? 0.42 : 0.7),
      };
    }

    let viewport = {
      centerX: containerRef.current.clientWidth / 2,
      centerY:
        containerRef.current.clientWidth < 640
          ? containerRef.current.clientHeight * 0.38
          : containerRef.current.clientHeight / 2,
      ...getScatterRange(),
    };

    let state = {
      activeCards: [] as ScatterCard[],
      currentSection: 0,
      isAnimating: false,
    };

    function updateViewport() {
      if (!containerRef.current) return;
      const isNarrow = containerRef.current.clientWidth < 640;
      viewport.centerX = containerRef.current.clientWidth / 2;
      viewport.centerY = isNarrow
        ? containerRef.current.clientHeight * 0.38
        : containerRef.current.clientHeight / 2;
      Object.assign(viewport, getScatterRange());
    }

    function getEdgePosition(
      centerX: number,
      centerY: number,
      width: number,
      height: number,
    ) {
      const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
      const containerHeight =
        containerRef.current?.clientHeight || window.innerHeight;

      const distances = {
        left: centerX,
        right: containerWidth - centerX,
        top: centerY,
        bottom: containerHeight - centerY,
      };

      const minDistance = Math.min(...Object.values(distances));
      const cardCenterOffsetX = width / 2;
      const cardCenterOffsetY = height / 2;
      const offsetVariation = () => (Math.random() - 0.5) * 400;

      if (minDistance === distances.left) {
        return {
          x: -width - 100 - Math.random() * 200,
          y: centerY - cardCenterOffsetY + offsetVariation(),
        };
      }
      if (minDistance === distances.right) {
        return {
          x: containerWidth + 50 + Math.random() * 200,
          y: centerY - cardCenterOffsetY + offsetVariation(),
        };
      }
      if (minDistance === distances.top) {
        return {
          x: centerX - cardCenterOffsetX + offsetVariation(),
          y: -height - 100 - Math.random() * 200,
        };
      }

      return {
        x: centerX - cardCenterOffsetX + offsetVariation(),
        y: containerHeight + 50 + Math.random() * 200,
      };
    }

    function createCards(sectionIndex: number) {
      const cards: ScatterCard[] = [];
      const sectionData = data[sectionIndex];

      if (!sectionData || !sectionData.images.length) return cards;

      sectionData.images.forEach((image) => {
        const { width, height } = fitLongEdge(image.width, image.height, size);

        const card = document.createElement("button");
        card.type = "button";
        card.className =
          "absolute cursor-pointer overflow-hidden rounded-sm border border-border bg-bg-elevated shadow-[0_20px_50px_rgba(0,0,0,0.55)] will-change-transform transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
        card.style.width = `${width}px`;
        card.style.height = `${height}px`;
        card.setAttribute(
          "aria-label",
          image.alt ? `Open ${image.alt}` : `Open ${sectionData.heading} frame`,
        );
        card.dataset.imageId = image.id;

        const { props: imageProps } = getImageProps({
          src: image.src,
          alt: "",
          width: image.width,
          height: image.height,
          sizes: `${width}px`,
          quality: 75,
        });

        const img = document.createElement("img");
        img.src = imageProps.src;
        if (imageProps.srcSet) img.srcset = imageProps.srcSet;
        if (imageProps.sizes) img.sizes = imageProps.sizes;
        img.alt = "";
        img.decoding = "async";
        img.loading = "lazy";
        img.className = "pointer-events-none h-full w-full object-cover";
        card.appendChild(img);

        card.addEventListener("click", () => {
          onImageClickRef.current?.(image, sectionData.heading);
        });

        const angle = Math.random() * Math.PI * 2;
        const radius =
          viewport.rangeMin +
          Math.random() * (viewport.rangeMax - viewport.rangeMin);
        const centerX = viewport.centerX + Math.cos(angle) * radius;
        const centerY = viewport.centerY + Math.sin(angle) * radius;

        gsap.set(card, {
          left: centerX - width / 2,
          top: centerY - height / 2,
          rotation: Math.random() * 50 - 25,
        });

        gallery.appendChild(card);
        cards.push({ element: card, centerX, centerY, width, height });
      });

      return cards;
    }

    function animateHeading(newText: string) {
      return gsap
        .timeline()
        .to(galleryHeading, {
          opacity: 0,
          duration: headingFadeDuration,
          ease: "power2.inOut",
        })
        .call(() => {
          galleryHeading.textContent = newText;
        })
        .to(galleryHeading, {
          opacity: 1,
          duration: headingFadeDuration,
          ease: "power2.inOut",
        });
    }

    function animateCards(exitingCards: ScatterCard[], enteringCards: ScatterCard[]) {
      const tl = gsap.timeline();

      exitingCards.forEach(({ element, centerX, centerY, width, height }) => {
        const targetEdge = getEdgePosition(centerX, centerY, width, height);
        tl.to(
          element,
          {
            left: targetEdge.x,
            top: targetEdge.y,
            rotation: Math.random() * 180 - 90,
            duration: animationDuration,
            ease: "power2.in",
            onComplete: () => element.remove(),
          },
          0,
        );
      });

      enteringCards.forEach(({ element, centerX, centerY, width, height }) => {
        const targetEdge = getEdgePosition(centerX, centerY, width, height);
        gsap.set(element, {
          left: targetEdge.x,
          top: targetEdge.y,
          rotation: Math.random() * 180 - 90,
        });

        tl.to(
          element,
          {
            left: centerX - width / 2,
            top: centerY - height / 2,
            rotation: Math.random() * 50 - 25,
            duration: animationDuration,
            ease: "power2.out",
          },
          animationOverlap,
        );
      });

      return tl;
    }

    function reinitialize() {
      state.activeCards.forEach(({ element }) => element.remove());
      updateViewport();
      state.activeCards = createCards(state.currentSection);
    }

    state.activeCards = createCards(0);
    galleryHeading.textContent = data[0]?.heading || "";
    gsap.set(galleryHeading, { opacity: 1 });

    function nextSection() {
      if (state.isAnimating) return;

      const targetSection = (state.currentSection + 1) % data.length;

      state.isAnimating = true;
      const newCards = createCards(targetSection);

      Promise.all([
        animateCards(state.activeCards, newCards).then(),
        animateHeading(data[targetSection]?.heading || "").then(),
      ]).then(() => {
        state.activeCards = newCards;
        state.currentSection = targetSection;
        state.isAnimating = false;
      });
    }

    const intervalId = setInterval(nextSection, 3000);

    const handleResize = () => {
      reinitialize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      state.activeCards.forEach(({ element }) => element.remove());
    };
  }, [data, size, animationDuration, animationOverlap, headingFadeDuration]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent",
        className,
      )}
    >
      <div ref={galleryRef} className="absolute inset-0" />
      <p
        ref={headingRef}
        aria-live="polite"
        className="pointer-events-none absolute top-[16%] z-10 w-[90%] text-center font-sans text-[0.7rem] uppercase tracking-[0.22em] text-fg-muted/55 will-change-[opacity] sm:relative sm:top-auto sm:text-xs sm:tracking-[0.18em] sm:text-fg-muted/70"
      />
    </section>
  );
}
