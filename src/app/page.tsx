import { CinematicHero } from "@/components/cinematic-hero";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { portfolio } from "@/content/portfolio";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <GallerySection images={portfolio} />
      <ContactSection />
    </>
  );
}
