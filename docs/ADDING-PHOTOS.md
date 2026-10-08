# Adding New Photo Series

This guide explains how to add new photo sets to the candidd portfolio site.

## Quick Start

1. **Prepare your images**
   - Optimize images to WebP format (recommended: 85% quality, max 1600px width)
   - Use descriptive filenames (e.g., `product-hero.webp`, `detail-closeup.webp`)

2. **Create a folder** under `/public/series/<your-series-slug>/`
   ```
   public/
   └── series/
       └── my-new-series/
           ├── image-01.webp
           ├── image-02.webp
           └── ...
   ```

3. **Add the series data** to `/src/content/series.ts`

4. **Done!** The home page preview and dedicated gallery page are generated automatically.

---

## Detailed Steps

### 1. Optimize Images

Raw photos are typically 2-10MB. For web, aim for 100-300KB per image.

**Using the included script (recommended):**

```bash
# Create a new optimization script or modify scripts/optimize-images.mjs
node scripts/optimize-images.mjs
```

**Using sharp directly:**

```javascript
import sharp from 'sharp';

await sharp('input.png')
  .resize(1600, null, { withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile('output.webp');
```

**Using ImageMagick (CLI):**

```bash
convert input.png -resize 1600x -quality 85 output.webp
```

### 2. Add Series Data

Edit `/src/content/series.ts` and add a new entry to the `photoSeries` array:

```typescript
{
  slug: "my-new-series",           // URL-safe identifier
  title: "Series Title",           // Display title
  subtitle: "Optional tagline",    // Shown below title
  description: "Full description of the series...",
  year: 2026,
  coverImage: "/series/my-new-series/hero.webp",  // Used for OG image
  images: [
    {
      id: "hero",                  // Unique within series
      src: "/series/my-new-series/hero.webp",
      alt: "Descriptive alt text for accessibility",
      width: 1024,                 // Actual image dimensions
      height: 1536,
      category: "product",         // Optional grouping
      featured: true,              // Show in home preview (pick 2-6)
    },
    // ... more images
  ],
}
```

### 3. Image Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier within the series |
| `src` | Yes | Path from `/public` (e.g., `/series/slug/name.webp`) |
| `alt` | Yes | Descriptive text for screen readers |
| `width` | Yes | Actual pixel width |
| `height` | Yes | Actual pixel height |
| `category` | No | Grouping label (shown in gallery) |
| `featured` | No | If `true`, shown in home page preview |

### 4. Featured Images

Mark 2-6 images as `featured: true` to appear in the home page preview. Choose:
- Your strongest hero/cover shot
- A variety that represents the series
- Mix of different categories/angles

The home preview links to the full gallery at `/series/<slug>`.

---

## File Structure

```
src/
├── content/
│   └── series.ts          # ← Edit this to add series
├── components/
│   ├── series-preview.tsx # Home page preview component
│   └── series-gallery.tsx # Full gallery page component
└── app/
    └── series/
        └── [slug]/
            └── page.tsx   # Dynamic route for each series

public/
└── series/
    ├── one-piece-three-looks/
    │   ├── product-stone.webp
    │   └── ...
    └── poedagar-watch/
        ├── dial-closeup.webp
        └── ...
```

---

## Tips

- **Naming**: Use lowercase, hyphenated names (`my-series-name`)
- **Dimensions**: Get dimensions with `sharp(file).metadata()` or ImageMagick `identify`
- **Alt text**: Be specific and descriptive ("Gold earring on stone" not just "Product")
- **Order**: Images appear in the order listed in the array
- **Categories**: Use consistent category names across images for visual grouping

---

## Example Optimization Script

See `/scripts/optimize-images.mjs` for a complete example that:
- Reads PNGs from an input folder
- Resizes to max 1600px width
- Converts to WebP at 85% quality
- Outputs dimensions for the data file
