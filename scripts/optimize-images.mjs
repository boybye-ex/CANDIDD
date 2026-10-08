import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOADS_DIR = '/home/ubuntu/.cursor/projects/workspace/uploads';
const OUTPUT_DIR = './public/series/one-piece-three-looks';

const imageConfig = [
  // Product shots
  { file: 'c98296c99fd8edb5bf282d26d98b017aa4bdeb7a2252c514d52853a19a271927_297c.png', name: 'product-stone', category: 'product' },
  { file: 'c6f5f1e71ed48a6ac0edfd804b8d6b3dbc439b81d781d304099a54419c352829_e075.png', name: 'hand-holding', category: 'product' },
  { file: '7e9bfd7b62f505a94b41b6fd505461fdbdb126fe61689a58168f216c1b672ea2_75f6.png', name: 'ear-closeup-casual', category: 'everyday' },
  
  // Everyday Casual (white tee, jeans)
  { file: '64c000c3cb8b2dd92280202849ebca14bd436b5b16c63817b243ca00f76698c2_b43d.png', name: 'walking-coffee-casual', category: 'everyday' },
  { file: 'e0c865c35ebd3e80c195294908027134da51915e6e788ad92bc8f2ca128e7ea7_898e.png', name: 'cafe-laptop', category: 'everyday' },
  { file: 'd54ae56bc14a96a0cb0dbed56f24e026f6b86022299e68849c048046af0d5a80_712f.png', name: 'portrait-casual', category: 'everyday' },
  
  // Evening Elevated (black top, martini)
  { file: 'eb4e4584fa412ace07d72317f67f3c436d186f56fb3acf584314c2926210ddf4_6942.png', name: 'martini-bar', category: 'evening' },
  
  // Soft Luxe Neutrals (beige linen suit)
  { file: '83632458f19289441cfbcaedecf1c19b397a2af7eb6c1dd5cb0d2ec5f39fa29d_591f.png', name: 'back-view-blazer', category: 'softluxe' },
  { file: 'd747b0303c65d7ebb227547030bb53eed17ebf08da9448293d7a080716a99c37_4536.png', name: 'reading-book', category: 'softluxe' },
  { file: 'a10dadcb67f6d5948ca01291636f8be331fd6b3d00a6709c34953ee4970bf805_13ec.png', name: 'portrait-softluxe', category: 'softluxe' },
  { file: 'df9f36f263d7bec6f343804cceb59569cdd37e8c1772e2a3c755d036836169d6_bce5.png', name: 'walking-coffee-softluxe', category: 'softluxe' },
  
  // Collages/Posters (selective - best ones)
  { file: 'c543cbc4df4e49a82ba4820de72f06f8eb260c02e9aa2e88dc57d3d870951fcc_16f8.png', name: 'title-poster', category: 'poster' },
  { file: 'dea7da4e0dfe704c4019d235908198bc39351715d32d7004bf9d7a00d582d942_699c.png', name: 'three-looks-comparison', category: 'poster' },
  { file: 'a62079e3518d8554ec05039931a40034edcab846e42417cd7c5ff44aec09ecc1_b0af.png', name: 'lookbook-grid', category: 'poster' },
  { file: 'c421d50daba9584b6f5156461430afe9b7e4d5ad4f03d775be7b60293b964238_fa23.png', name: 'evening-collage', category: 'poster' },
  { file: 'd3f5266b140a8cb38f99074decc8dbd0d1b1add5d7c77a4626f3295ffff851a8_fbaf.png', name: 'putting-on-earring', category: 'poster' },
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
        category: config.category,
        ...dimensions,
      });
      console.log(`  → ${dimensions.width}x${dimensions.height}`);
    } catch (error) {
      console.error(`Failed to process ${config.name}:`, error.message);
    }
  }
  
  console.log('\n--- Image dimensions for data file ---');
  console.log(JSON.stringify(results, null, 2));
}

main();
