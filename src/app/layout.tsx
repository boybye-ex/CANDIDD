import type { Metadata } from "next";
import { Bebas_Neue, Karla } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ogImage } from "@/content/portfolio";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "candidd",
    template: "%s — candidd",
  },
  description: "Candid photography — moments as they land. Inquire for portrait, event, and documentary work.",
  openGraph: {
    title: "candidd",
    description: "Candid photography — moments as they land.",
    type: "website",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "candidd",
    description: "Candid photography — moments as they land.",
    images: [ogImage.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="film-grain flex min-h-full flex-col bg-bg text-fg">
        <a
          href="#work"
          className="absolute left-4 top-4 z-[60] -translate-y-[200%] bg-bg-elevated px-4 py-2 text-sm text-fg transition-transform focus:translate-y-0"
        >
          Skip to work
        </a>
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
