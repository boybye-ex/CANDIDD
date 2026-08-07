# candidd design system

## World

Cinema / projection booth. Deep near-black grounds, silver-warm type, photos as the light source. Soft grain and vignette for atmosphere only.

## Palette

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#0a0a0a` | Page ground |
| `--bg-elevated` | `#111111` | Lightbox / overlays |
| `--fg` | `#e8e4df` | Primary text |
| `--fg-muted` | `#8a857d` | Captions, meta |
| `--accent` | `#c4a574` | Focus rings, wordmark underline, sparse accents |
| `--border` | `rgba(232, 228, 223, 0.12)` | Hairlines only when needed |

No neon, purple gradients, or glow stacks.

## Typography

- **Display:** Bebas Neue — hero-scale **candidd** wordmark (film title-card energy)
- **UI / captions:** Karla — quiet humanist for nav, supporting line, image titles

## Layout

- First viewport: one composition — full-bleed hero photo, brand dominant, one short line, scroll CTA. No cards, badges, or stat strips on the hero.
- Gallery: asymmetric column rhythm with varied aspect ratios. Photos are primary; no card chrome around images.
- Header: minimal wordmark + Work link; does not compete with photography.
- Footer: year + candidd only.

## Motion

1. Hero: slight scale + fade settle on load
2. Gallery: staggered fade-up on scroll into view
3. Lightbox: opacity + slight scale open/close

Respect `prefers-reduced-motion: reduce` — disable non-essential motion.

## Do / don’t

**Do:** Let images bleed edge-to-edge where intended; keep type quiet next to photos; use accent sparingly.

**Don’t:** Purple/indigo themes; floating promo chips on media; equal-card grids; Inter/Roboto/system stacks for brand type.
