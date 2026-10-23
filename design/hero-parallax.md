# Hero parallax layers

Source: `public/images/hero-workspace.png`.

Generated using the built-in imagegen tool. The source is retained as a static fallback on small screens, when reduced motion is enabled, and until all layers load.

The layers share the original framing and render in this order:

1. `public/images/hero-parallax-sky.png`
2. `public/images/hero-parallax-landscape.png`
3. `public/images/hero-parallax-foreground.png`

Scroll travel is bounded and updated with requestAnimationFrame.

## Prompts

### sky

Edit target: attached workspace artwork. Produce ONLY the sky and sun background plate for a parallax reconstruction, keeping the EXACT original wide 16:9 framing, positions, style and orange/navy colors. Remove and inpaint all mountains, lake, trees, room, desk, laptop, plants, chair, windows, mullions and holographic panels. Extend orange sunset sky naturally behind removed objects on the right, fading to the original near-black navy negative space on left. Preserve original sun at its original position near upper right (96.5% x,24% y). No additional suns. Opaque background. No text. This will be behind two aligned transparent layers.

### landscape

Edit target: attached workspace artwork. Extract ONLY the outdoor landscape: all layered mountains, lake, forest and shoreline in EXACT original positions, with original wide 16:9 canvas and no reframing or cropping. Remove sky and sun to actual transparent alpha. Remove the entire interior room, window frames, desk, laptop, chair, plants, mug, books and holographic panels to transparent alpha. Reconstruct the outdoor landscape behind those removed foreground objects, with mountains horizon matching original right side at 25-35% canvas height, continuing to bottom of canvas. Keep the left 40% entirely transparent fading softly from landscape into transparency. Above mountain silhouettes must be transparent, no sky or sun. Preserve sunset lighting navy/coral colors, no text.

### foreground

Edit target: attached workspace artwork. Extract the complete INTERIOR FOREGROUND as one transparent parallax layer. Preserve EXACT original positions, dimensions, wide 16:9 canvas and framing: desk, laptop, chair, mug, books, all houseplants, left interior wall dark fade, shelves, window frames/mullions and floating orange diagram glass panels. Remove ONLY the outdoor landscape visible through windows: sky, sun, mountains, lake and trees outside must become actual transparent alpha, so another background can show through. Inpaint no outdoor elements. Keep orange interior edge lighting. Left 40% should retain original near-black navy fade. Do not move or resize anything; no crop, no invented objects. This must align over the original image perfectly.
