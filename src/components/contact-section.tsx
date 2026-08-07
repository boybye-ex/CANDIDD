import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2
            id="contact-heading"
            className="font-display text-4xl tracking-wide text-fg sm:text-5xl"
          >
            Inquire
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted sm:text-base">
            Candid and documentary work for people, places, and nights that
            stay with you. Tell me what you’re planning — I’ll reply with
            availability.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="min-h-64 animate-pulse rounded-sm border border-border bg-bg-elevated/40" />
          }
        >
          <InquiryForm />
        </Suspense>
      </div>
    </section>
  );
}
