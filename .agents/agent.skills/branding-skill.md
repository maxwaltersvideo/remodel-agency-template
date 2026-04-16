**Name:** Boutique Branding Architect  
**Description:** Generates unique, high-end visual identities for contractors using the "Quiet Luxury" and "Soft Brutalism" frameworks.

## 1. Core Visual Framework
* **Execution Protocol (Mandatory)**: Do not choose a layout architecture autonomously. You must strictly follow the **"Pre-Flight Directive"** issued by the Project Manager. Your role is to apply the technical and visual standards (OKLCH, Soft Brutalism, Quiet Luxury) to the specific alignment and shape variables dictated by the PM.
[cite_start]The agent must reject the "generic template" look in favor of a bespoke boutique standard. [cite: 1207, 1215]
* [cite_start]**Aesthetic Principle**: Implement **"Quiet Luxury"** — emphasizing minimalism, muted tones, and generous white space to create refined confidence. [cite: 1226]
* [cite_start]**Design Trend**: Use **"Soft Brutalism"** — replacing harsh edges with rounded structures, warm tones, and minimalist icons. [cite: 1224]
1.1 The Variable Composition Engine (Mandatory)
To ensure every build is unique while maintaining the "Boutique Construction" aesthetic, the agent must randomize the following four variables for every project:

Focal Point Alignment: Analyze the curated Hero image and choose the alignment that maximizes negative space. Rotate between Asymmetric Left, Balanced Center, and Right-Pocket layouts.

Typography "Personality":

The Power Header: Massive font size, tight leading (Industrial/Strong).

The Refined Specialist: Medium size, wide letter-spacing, and italics for secondary keywords (High-End/Meticulous).

Shape Language & Accents:

Hard Edge: 0px border-radius and solid shadows (Structural vibe).

Precision Soft: 4px–8px radius and ghost buttons (Modern Residential vibe).

Chromatic Distribution: Vary where the "Pop" color is used. Project A might use the brand color for the Hero background; Project B uses it only for the primary CTA button and a single decorative line.

## 2. Advanced Color Engineering (OKLCH & Tailwind 4)
[cite_start]Using the provided contractor logo or niche, the agent will engineer a full color system. [cite: 301]
* [cite_start]**Perceptual Uniformity**: All shade ramps must be generated in the **OKLCH color space**. [cite: 317] [cite_start]This prevents the "muddy" look of traditional RGB generation and ensures branding remains crisp. [cite: 317]
* **Palette Anchors**:
    * [cite_start]**Trust Blue**: The primary anchor to trigger psychological associations with credibility and calm. [cite: 267, 1451]
    * [cite_start]**Contractor Gold/Safety Orange**: Used strategically for CTAs and interactive highlights to emphasize speed and safety. [cite: 267, 1451]
* [cite_start]**Neighborhood Variation**: For Los Angeles leads, the agent must shift palettes based on hyper-local vibes (e.g., "Understated Opulence" for Beverly Hills or "Modern Industrial" for Silver Lake). [cite: 1073]

## 3. Typographic Discipline
[cite_start]Typography is a primary tool to establish authority without relying on heavy imagery. [cite: 1228]
* [cite_start]**Header Fonts**: Use bold, thick sans-serifs such as **Oswald, Montserrat, or Roboto** to project strength and precision. [cite: 268, 1452]
* [cite_start]**Fluidity**: Implement **Fluid Typography** using the CSS `clamp()` function. [cite: 1255] [cite_start]Text must scale proportionally with the viewport to prevent "broken layouts" on mobile devices used at job sites. [cite: 1255, 1461]

## 4. Visual Pattern Integration
[cite_start]Borrow UI patterns from luxury automotive and real estate to match the "Construction Elite" standard. [cite: 1232]
* [cite_start]**Inventory-First Pattern**: Place curated "Featured Projects" immediately above the fold, similar to Porsche or Bugatti layouts. [cite: 1236, 1237]
* [cite_start]**Spatial Layering**: Use 3D design concepts to increase perceived quality (e.g., subtle tilts or real-time shadows on hover states). [cite: 1239]
* [cite_start]**Visual Stability**: Reserve exact space for images and videos using the CSS `aspect-ratio` property to maintain a **Cumulative Layout Shift (CLS)** of less than 0.1. [cite: 1258, 1318]
## Media Polish Standards
- **Hero Visibility**: Dark overlays on Hero backgrounds must never exceed `0.70` opacity. Use `0.55` to `0.65` as the default range to ensure high-end architectural photography remains visible.
- **Asset Optimization**: Ensure all stock placeholders are converted to WebP or AVIF formats during the initial curation.
The Metadata Badge Standard (Mandatory)
UI Pattern: All project metadata (Sq Ft, Location, Year) must be contained in high-contrast "Schema Badges."

Bespoke Color Pairing: Use var(--color-trust-blue) text on a var(--color-trust-blue-subtle) background with a subtle border (1px solid oklch(0.30 0.075 245 / 0.15)).

Hierarchy: The project Value/Price should remain the only element using the high-visibility var(--color-warm-gold) badge to maintain a clear "Profit Anchor."

Grid Consistency: In project grids, metadata must use high-contrast display fonts (weight 600+) to ensure readability at 1x zoom without needing a hover state.

## 5. Implementation Instructions for Antigravity
When this skill is invoked with a `{contractor_name, niche, logo}`:
1.  **Analyze**: Use Gemini 3 Vision to extract a hex code from the logo.
2.  **Generate**: Expand that hex into a full OKLCH system.
3.  **Inject**: Rewrite the `:root` variables in `globals.css` with these new tokens.
4.  **Select**: Choose a font pairing (e.g., Montserrat + Roboto) based on whether the contractor is "Luxury Residential" or "Industrial Commercial."
5.  Audit: Perform a "Veto Check" — if the layout architecture (alignment, shapes, or typography personality) matches the previous build in the /Leads folder, the build is REJECTED. Re-compose using a different variable set from the Composition Engine.
Moodboard Analysis (Inspiration Engine): Before generating the design system, the agent must scan the /Moodboard/ folder.

DNA Extraction: Do not copy the layouts. Instead, extract the "Visual DNA" (e.g., specific shadow depths, font-weight pairings, or whitespace ratios) that Max likes.

Style Matching: Select the moodboard asset that most closely aligns with the contractor's niche and location (e.g., matching a "Mediterranean Modern" screenshot with a Camarillo remodeler) and use it as a stylistic anchor for the Composition Engine.