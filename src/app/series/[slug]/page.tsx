import { notFound } from "next/navigation";
import { Metadata } from "next";
import { photoSeries, getSeriesBySlug } from "@/content/series";
import { SeriesGallery } from "@/components/series-gallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return photoSeries.map((series) => ({
    slug: series.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return {
      title: "Series Not Found",
    };
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: `${series.title} — candidd`,
      description: series.description,
      images: [
        {
          url: series.coverImage,
          alt: series.title,
        },
      ],
    },
  };
}

export default async function SeriesPage({ params }: PageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  return <SeriesGallery series={series} />;
}
