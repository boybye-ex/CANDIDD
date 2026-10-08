import { CinematicHero } from "@/components/cinematic-hero";
import { FeaturedCampaign } from "@/components/featured-campaign";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { portfolio, earringsCampaign } from "@/content/portfolio";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <FeaturedCampaign
        title="One Piece, Three Looks"
        subtitle="An editorial earrings campaign — one statement piece, styled three ways."
        images={earringsCampaign}
      />
      <GallerySection images={portfolio} />
      <ContactSection />
    </>
  );
}
