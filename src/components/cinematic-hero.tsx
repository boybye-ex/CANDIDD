"use client";

import Image from "next/image";
import { ogImage } from "@/content/portfolio";

export function CinematicHero() {
  return (
    <section
      className="relative h-[100svh] min-h-[520px] overflow-hidden bg-bg sm:min-h-[640px]"
      aria-label="candidd"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="ken-burns absolute inset-0 h-full w-full">
          <Image
            src={ogImage.src}
            alt={ogImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="animate-hero-settle font-display text-[clamp(3.5rem,18vw,12rem)] font-normal leading-[0.85] tracking-[0.02em] text-fg">
            candidd
          </h1>
          <p className="animate-fade-up mt-3 max-w-md text-sm text-fg-muted [animation-delay:0.35s] sm:mt-4 sm:text-lg">
            Candid photography — moments as they land.
          </p>
          <a
            href="#work"
            className="animate-fade-up mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-fg transition-colors hover:text-accent [animation-delay:0.55s]"
          >
            View work
            <span aria-hidden className="translate-y-px">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
