import { GalleryGrid } from "@/components/gallery-grid";
import { ContactSection } from "@/components/contact-section";
import { portfolio } from "@/content/portfolio";

export default function Home() {
  return (
    <>
      <GalleryGrid images={portfolio} />
      <ContactSection />
    </>
  );
}
