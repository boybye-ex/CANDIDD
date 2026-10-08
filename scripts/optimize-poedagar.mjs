import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOADS_DIR = '/home/ubuntu/.cursor/projects/workspace/uploads';
const OUTPUT_DIR = './public/series/poedagar-watch';

const imageConfig = [
  { file: 'poedagar-01_8aca.png', name: 'side-profile' },
  { file: 'poedagar-02_6b47.png', name: 'lume-glow' },
  { file: 'poedagar-03_3244.png', name: 'dial-daylight' },
  { file: 'poedagar-04_14b8.png', name: 'date-window' },
  { file: 'poedagar-05_0eec.png', name: 'dial-closeup' },
  { file: 'poedagar-06_f466.png', name: 'crown-detail' },
];

async function optimizeImage(inputPath, outputPath, maxWidth = 1600) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const width = Math.min(metadata.width, maxWidth);
  
  await image
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath);
  
  const newMetadata = await sharp(outputPath).metadata();
  return { width: newMetadata.width, height: newMetadata.height };
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }
  
  const results = [];
  
  for (const config of imageConfig) {
    const inputPath = path.join(UPLOADS_DIR, config.file);
    const outputPath = path.join(OUTPUT_DIR, `${config.name}.webp`);
    
    try {
      console.log(`Processing ${config.name}...`);
      const dimensions = await optimizeImage(inputPath, outputPath);
      results.push({
        id: config.name,
        ...dimensions,
      });
      console.log(`  → ${dimensions.width}x${dimensions.height}`);
    } catch (error) {
      console.error(`Failed to process ${config.name}:`, error.message);
    }
  }
  
  console.log('\n--- Image dimensions ---');
  console.log(JSON.stringify(results, null, 2));
}

main();
