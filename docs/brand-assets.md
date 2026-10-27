# MOVINGO transparent brand assets

Created with the built-in image generation tool in background-extraction mode. Original source images are retained.

- `public/movingo-logo-transparent.png`: full logo, 1774 × 887, real PNG alpha.
- `public/movingo-symbol-transparent.png`: standalone mark, 1774 × 887, real PNG alpha.
- `app/icon.png`: copy of the transparent standalone mark.

Both files were inspected and verified to contain an alpha channel with fully transparent and fully opaque pixels. The header uses the full-color PNG without a background plate. The footer uses the same alpha asset with an ivory CSS treatment for contrast. Box labels and the journey truck use the original-color PNGs.

## Full-logo prompt

Use case: background-extraction. Edit target: attached MOVINGO company logo. Remove the white background completely, including all white negative spaces around and inside the truck and letters. Preserve the exact existing red and charcoal ribbon M/truck symbol, lettering MOVINGO, and tagline DÉMÉNAGEMENT & TRANSPORT, proportions and colors. Do not redesign or invent any elements. Produce a clean real alpha-transparent PNG cutout with no white matte, no checkerboard baked in, no floor shadow. Crop the canvas tightly around the entire logo with about 4% clear padding, wide landscape framing. This is a production website brand asset.

## Standalone-symbol prompt

Use case: background-extraction. Edit target: supplied MOVINGO red and charcoal ribbon M / truck symbol. Remove only the white background, including all white negative spaces inside the truck wheel and window. Preserve the exact symbol design, proportions and colors. Deliver a real alpha-transparent PNG, no baked checkerboard, no white matte, no floor or drop shadow. Tightly crop the entire mark with 4% clear padding, landscape framing. No letters or additional elements. Production website logo cutout.
