#!/usr/bin/env node
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const QUALITY = 85;
const MAX_WIDTH = 1600;

const UPLOADS = "/home/ubuntu/.cursor/projects/workspace/uploads";

const images = [
  // Poedagar watch additional images (07-09)
  {
    input: `${UPLOADS}/poedagar-07_d8df.png`,
    output: "public/series/poedagar-watch/case-lug-closeup.webp",
  },
  {
    input: `${UPLOADS}/poedagar-08_bfe6.png`,
    output: "public/series/poedagar-watch/bracelet-links.webp",
  },
  {
    input: `${UPLOADS}/poedagar-09_8e81.png`,
    output: "public/series/poedagar-watch/bezel-macro.webp",
  },
  // Elysian fragrance series (01-09)
  {
    input: `${UPLOADS}/elysian-01_2a4e.png`,
    output: "public/series/elysian-fragrance/bottle-detail.webp",
  },
  {
    input: `${UPLOADS}/elysian-02_6caa.png`,
    output: "public/series/elysian-fragrance/product-waterfall.webp",
  },
  {
    input: `${UPLOADS}/elysian-03_1cc7.png`,
    output: "public/series/elysian-fragrance/box-flare.webp",
  },
  {
    input: `${UPLOADS}/elysian-04_c814.png`,
    output: "public/series/elysian-fragrance/stag-emblem.webp",
  },
  {
    input: `${UPLOADS}/elysian-05_8051.png`,
    output: "public/series/elysian-fragrance/bottle-splash.webp",
  },
  {
    input: `${UPLOADS}/elysian-06_02ed.png`,
    output: "public/series/elysian-fragrance/shoulder-macro.webp",
  },
  {
    input: `${UPLOADS}/elysian-07_fca0.png`,
    output: "public/series/elysian-fragrance/cap-closeup.webp",
  },
  {
    input: `${UPLOADS}/elysian-08_6cdf.png`,
    output: "public/series/elysian-fragrance/campaign-poster.webp",
  },
  {
    input: `${UPLOADS}/elysian-09_882b.png`,
    output: "public/series/elysian-fragrance/title-frame.webp",
  },
];

async function optimizeImage(inputPath, outputPath) {
  const outputDir = path.dirname(outputPath);
  await mkdir(outputDir, { recursive: true });

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY }).toFile(outputPath);
  const outputMeta = await sharp(outputPath).metadata();

  console.log(
    `✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} ` +
      `(${outputMeta.width}×${outputMeta.height})`
  );
  return { width: outputMeta.width, height: outputMeta.height };
}

async function main() {
  console.log("Optimizing new images...\n");
  for (const img of images) {
    await optimizeImage(img.input, img.output);
  }
  console.log("\nDone!");
}

main().catch(console.error);
