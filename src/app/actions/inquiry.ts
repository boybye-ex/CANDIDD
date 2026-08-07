import { z } from "zod";
import { portfolioSets, shootTypes } from "@/content/portfolio";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Valid email required"),
  shootType: z.enum(shootTypes),
  dateRange: z.string().trim().max(120).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
  referenceSet: z.enum(portfolioSets).optional().or(z.literal("")),
  referenceTitle: z.string().trim().max(120).optional().or(z.literal("")),
  referenceId: z.string().trim().max(40).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Client-side submit — Web3Forms blocks server-proxied calls. Access key is public by design. */
export async function submitInquiry(
  raw: InquiryInput,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const referenceLine = [
    data.referenceSet && `Set: ${data.referenceSet}`,
    data.referenceTitle && `Frame: ${data.referenceTitle}`,
    data.referenceId && `ID: ${data.referenceId}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const payload = {
    access_key: accessKey,
    subject: `candidd inquiry — ${data.shootType} — ${data.name}`,
    from_name: "candidd",
    name: data.name,
    email: data.email,
    shoot_type: data.shootType,
    date_range: data.dateRange || "—",
    location: data.location || "—",
    reference: referenceLine || "—",
    message: data.message,
  };

  if (!accessKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[candidd inquiry — dev, no NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY]\n", payload);
      return { ok: true };
    }
    return {
      ok: false,
      error:
        "Inquiry email is not configured yet. Please try mailto or check back soon.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !result.success) {
      console.error("[candidd inquiry]", result);
      return {
        ok: false,
        error: "Could not send right now. Try again shortly.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[candidd inquiry]", error);
    return { ok: false, error: "Could not send right now. Try again shortly." };
  }
}
