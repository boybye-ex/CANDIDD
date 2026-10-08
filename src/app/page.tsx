import { CinematicHero } from "@/components/cinematic-hero";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { SeriesPreview } from "@/components/series-preview";
import { portfolio } from "@/content/portfolio";
import { photoSeries } from "@/content/series";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <div id="featured">
        {photoSeries.map((series) => (
          <SeriesPreview key={series.slug} series={series} maxImages={6} />
        ))}
      </div>
      <GallerySection images={portfolio} />
      <ContactSection />
    </>
  );
}
