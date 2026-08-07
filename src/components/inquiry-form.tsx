"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitInquiry } from "@/app/actions/inquiry";
import {
  getImageById,
  portfolioSets,
  shootTypes,
  type PortfolioSet,
  type ShootType,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-sm border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg placeholder:text-fg-muted/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

const labelClass = "mb-1.5 block text-xs uppercase tracking-[0.14em] text-fg-muted";

export function InquiryForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const initialRefId = searchParams.get("ref") ?? "";
  const initialSet = (searchParams.get("set") ?? "") as PortfolioSet | "";
  const referenced = useMemo(
    () => (initialRefId ? getImageById(initialRefId) : undefined),
    [initialRefId],
  );

  const [shootType, setShootType] = useState<ShootType>("Portrait");
  const [referenceSet, setReferenceSet] = useState<PortfolioSet | "">(
    (referenced?.set as PortfolioSet | undefined) ??
      (portfolioSets.includes(initialSet as PortfolioSet) ? initialSet : ""),
  );
  const [referenceTitle, setReferenceTitle] = useState(referenced?.title ?? "");
  const [referenceId, setReferenceId] = useState(referenced?.id ?? "");

  useEffect(() => {
    const nextId = searchParams.get("ref") ?? "";
    const nextSet = searchParams.get("set") ?? "";
    const image = nextId ? getImageById(nextId) : undefined;
    if (image) {
      setReferenceId(image.id);
      setReferenceTitle(image.title);
      setReferenceSet(image.set);
      return;
    }
    if (portfolioSets.includes(nextSet as PortfolioSet)) {
      setReferenceSet(nextSet as PortfolioSet);
    }
  }, [searchParams]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      setStatus("idle");
      setErrorMessage("");
      setFieldErrors({});

      const result = await submitInquiry({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        shootType,
        dateRange: String(formData.get("dateRange") ?? ""),
        location: String(formData.get("location") ?? ""),
        message: String(formData.get("message") ?? ""),
        referenceSet,
        referenceTitle,
        referenceId,
      });

      if (!result.ok) {
        setStatus("error");
        setErrorMessage(result.error);
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }

      setStatus("success");
      form.reset();
      setShootType("Portrait");
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-border bg-bg-elevated/60 px-5 py-8 sm:px-6">
        <p className="font-display text-3xl tracking-wide text-fg">Sent.</p>
        <p className="mt-3 max-w-md text-sm text-fg-muted">
          Thanks — I’ll reply soon. Keep an eye on your inbox.
        </p>
        <button
          type="button"
          className="mt-6 text-sm text-accent transition-opacity hover:opacity-80"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
          {fieldErrors.name?.[0] ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.name[0]}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@email.com"
          />
          {fieldErrors.email?.[0] ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.email[0]}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="shootType">
            Shoot type
          </label>
          <select
            id="shootType"
            name="shootType"
            className={fieldClass}
            value={shootType}
            onChange={(event) => setShootType(event.target.value as ShootType)}
          >
            {shootTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="dateRange">
            Preferred date
          </label>
          <input
            id="dateRange"
            name="dateRange"
            className={fieldClass}
            placeholder="Month / weekend / flexible"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="location">
          Location
        </label>
        <input
          id="location"
          name="location"
          className={fieldClass}
          placeholder="City or venue"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="referenceSet">
            Reference set
          </label>
          <select
            id="referenceSet"
            name="referenceSet"
            className={fieldClass}
            value={referenceSet}
            onChange={(event) =>
              setReferenceSet(event.target.value as PortfolioSet | "")
            }
          >
            <option value="">None</option>
            {portfolioSets.map((set) => (
              <option key={set} value={set}>
                {set}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="referenceTitle">
            Reference frame
          </label>
          <input
            id="referenceTitle"
            name="referenceTitle"
            className={cn(fieldClass, "bg-bg/80")}
            value={referenceTitle}
            onChange={(event) => setReferenceTitle(event.target.value)}
            placeholder="From lightbox / none"
          />
          <input type="hidden" name="referenceId" value={referenceId} />
        </div>
      </div>

      {(referenceTitle || referenceSet) && (
        <p className="text-xs text-fg-muted">
          Referencing{" "}
          <span className="text-fg">
            {[referenceSet, referenceTitle].filter(Boolean).join(" · ")}
          </span>
        </p>
      )}

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="What are you hoping to capture?"
        />
        {fieldErrors.message?.[0] ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.message[0]}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-fg px-6 text-sm font-medium tracking-wide text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
