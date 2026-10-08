#!/usr/bin/env node
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const QUALITY = 85;
const MAX_WIDTH = 1600;
const UPLOADS = "/home/ubuntu/.cursor/projects/workspace/uploads";

const images = [
  {
    input: `${UPLOADS}/elysian-10_7526.png`,
    output: "public/series/elysian-fragrance/studio-detail.webp",
  },
  {
    input: `${UPLOADS}/elysian-11_8299.png`,
    output: "public/series/elysian-fragrance/studio-reflection.webp",
  },
  {
    input: `${UPLOADS}/elysian-12_7a8d.png`,
    output: "public/series/elysian-fragrance/studio-bokeh.webp",
  },
  {
    input: `${UPLOADS}/elysian-13_81cc.png`,
    output: "public/series/elysian-fragrance/studio-rays.webp",
  },
  {
    input: `${UPLOADS}/elysian-14_c541.png`,
    output: "public/series/elysian-fragrance/diptych.webp",
  },
  {
    input: `${UPLOADS}/elysian-15_45b8.png`,
    output: "public/series/elysian-fragrance/grow-macro.webp",
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
  console.log("Optimizing Elysian batch 2 images...\n");
  for (const img of images) {
    await optimizeImage(img.input, img.output);
  }
  console.log("\nDone!");
}

main().catch(console.error);
