"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import type { PortfolioImage } from "@/content/portfolio";

interface LightboxProps {
  images: PortfolioImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const isOpen = index !== null;
  const current = isOpen ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const root = dialogRef.current;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    function onTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    root.addEventListener("keydown", onTab);
    return () => root.removeEventListener("keydown", onTab);
  }, [isOpen, index]);

  if (!isOpen || !current) return null;

  const inquireHref = `/?ref=${encodeURIComponent(current.id)}&set=${encodeURIComponent(current.set)}#contact`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-bg-elevated/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="animate-lightbox-in relative flex max-h-full w-full max-w-6xl flex-col gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="font-display text-2xl tracking-wide text-fg sm:text-3xl"
            >
              {current.title}
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              {current.set} · {current.year}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-sm px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            aria-label="Close lightbox"
          >
            Close
          </button>
        </div>

        <div className="relative mx-auto flex max-h-[70svh] w-full items-center justify-center">
          <Image
            key={current.id}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[70svh] w-auto max-w-full object-contain"
            sizes="(max-width: 1280px) 100vw, 1152px"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="text-sm tracking-wide text-fg-muted transition-colors hover:text-accent"
            aria-label="Previous image"
          >
            ← Prev
          </button>
          <p className="text-xs tabular-nums text-fg-muted">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="text-sm tracking-wide text-fg-muted transition-colors hover:text-accent"
            aria-label="Next image"
          >
            Next →
          </button>
        </div>

        <div className="flex justify-center pt-1">
          <Link
            href={inquireHref}
            onClick={onClose}
            className="inline-flex items-center rounded-sm border border-border bg-fg px-5 py-2.5 text-sm font-medium tracking-wide text-bg transition-opacity hover:opacity-90"
          >
            Inquire about this look
          </Link>
        </div>
      </div>
    </div>
  );
}
