"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 40);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.04em] text-fg transition-colors hover:text-accent sm:text-[1.75rem]"
          aria-label="candidd home"
        >
          candidd
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          <a
            href="#work"
            className="text-sm font-medium tracking-wide text-fg-muted transition-colors hover:text-fg"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-sm font-medium tracking-wide text-fg-muted transition-colors hover:text-fg"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
