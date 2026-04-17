**Name:** Full-Stack Performance Engineer  
**Description:** Executes the technical scaffold for high-converting contractor platforms using Next.js 16.2.2 and Tailwind 4.

## 1. Technical Stack & Core Architecture
- **Environment Persistence (Mandatory)**: Always prepend the following to terminal commands: `export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"`. The Node binary is located at `/usr/local/bin/node`. 
    * Instruction: "Do not search for Node or NPM. Use the provided path and binary location for all executions on the T7 Shield."
* **Execution Protocol**: You are a Production Specialist. You must execute the code structure based strictly on the **"Composition Set"** provided in the Project Manager's Directive. Do not deviate from the specified alignment or shape language.
* [cite_start]**Framework**: Always initialize using **Next.js 16.2.2** with the App Router[cite: 312, 313].
* [cite_start]**Styling**: Use **Tailwind CSS v4** with a CSS-first configuration[cite: 314, 316].
* **Path Aliases**: Initialize `tsconfig.json` with `"@/*": ["./src/*"]`. [cite_start]Use the `@/` prefix for all imports; never use relative paths like `../`[cite: 16].
* [cite_start]**Performance Target**: Engineer for a **20ms Time to First Byte (TTFB)** and a **100 Lighthouse score**[cite: 427, 646].
* **Global CORS Policy**: The Hub architecture MUST define a `corsHeaders` object with `"Access-Control-Allow-Origin": "*"` and include an `export async function OPTIONS()` preflight handler returning `204 No Content`. These headers MUST be attached to every response branch (200, 400, 401) so Spoke sites are never blocked by browser CORS policy. Tighten the origin allowlist before final production hardening.
## Technical Guardrails (Non-Negotiable)
- **Mandatory Dependencies**: Every project initialization MUST include `npm install sharp`. Next.js image optimization fails silently without it.
- **Image Configuration**: Automatically initialize `next.config.ts` with `images: { unoptimized: true }` for the initial build phase. This ensures assets load instantly during the Showroom preview without hitting optimizer errors.
- **Strict Quality Default**: All Next.js `<Image />` components must use a hardcoded `quality={75}`. Do not use 80, 85, or 90 unless explicitly added to the allowed qualities list in the config file.

## 2. The 20ms Performance Engine
* [cite_start]**Partial Prerendering (PPR)**: Enable `ppr: 'incremental'` in `next.config.js`[cite: 491, 638]. [cite_start]Mark individual routes with `export const experimental_ppr = true` to serve static shells instantly while dynamic content (like project availability) populates progressively[cite: 498, 509].
* [cite_start]**Edge Orchestration**: Pin all Vercel Functions to the **sfo1** region (San Francisco) to minimize latency for Southern California contractors[cite: 457, 636].
* [cite_start]**Data Fetching**: Use `Promise.all` for parallel data fetching to eliminate "waterfalls" and ensure the page shell delivers in <20ms[cite: 620, 628].

## 3. High-End Media Handling
* [cite_start]**4K Drone Video**: Serve all background footage via **HTTP Live Streaming (HLS)** using the `next-video` component to allow for adaptive bitrate streaming[cite: 576, 578].
* **LCP Optimization**: Implement the "Poster Image Hack." [cite_start]Use `next/image` to serve a high-priority AVIF first-frame still with `priority={true}` and `fetchPriority="high"` to capture the Largest Contentful Paint (LCP) event immediately[cite: 584, 585, 607].
Screenshot Mode: Include a global CSS utility .is-inspecting .reveal { opacity: 1 !important; transform: none !important; }.
* Instruction: When the browser subagent captures screenshots for verification, it must first execute document.body.classList.add('is-inspecting') to ensure all content is visible for the "Veto Checklist".

## 4. The "AI Remodel" Lead Magnet — V4.3 Hard-Wired Standard

### 4.1 Hub Architecture (Non-Negotiable)

**SDK**: The Hub MUST use `@google/genai` (the official Google GenAI SDK) — never raw `fetch` to the REST API. Install it with `npm install @google/genai`.

**Correct Model**: The ONLY model that supports native image generation is **`gemini-2.5-flash-image`**. This is non-negotiable. Do NOT use:
- `gemini-2.0-flash-exp` (deprecated as of April 2026)
- `gemini-2.5-flash` (text-only, no image output)
- `gemini-1.5-flash` or `gemini-1.5-pro-latest` (text-only)
- Any model without the `-image` suffix for image generation

**Billing Prerequisite**: `gemini-2.5-flash-image` is a PAID-ONLY model. Before any AI Remodel feature is deployed, you MUST verify that:
1. The Gemini API key belongs to a project with billing enabled (Blaze plan)
2. The `GEMINI_API_KEY` is set in Vercel → Project Settings → Environment Variables
3. A free-tier key will produce a `RESOURCE_EXHAUSTED / Quota exceeded` error. This is NOT a code bug.

**Hub Route Standard (`route.ts`) — Finalized:**
```typescript
import { GoogleGenAI } from "@google/genai";
const MODEL = "gemini-2.5-flash-image";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Two-part prompt: text analysis + image generation
const prompt = `YOUR RESPONSE MUST CONTAIN TWO PARTS:
PART 1 — ARCHITECTURAL ANALYSIS (3 sentences, plain prose): You MUST start the first sentence by identifying the transformation as a [EXACT STYLE NAME] aesthetic, where [EXACT STYLE NAME] is ${style}. Do not use any other style names. Describe specific materials (e.g., white oak, textured plaster) and lighting that specifically support the ${style} vibe.
PART 2 — GENERATED IMAGE: One complete ${roomType} transformed in ${style} style. MANDATORY: You must prioritize and incorporate these specific user requests: ${customNotes}. Ensure the architectural materials reflect these notes while maintaining the spatial lock.`;

const response = await ai.models.generateContent({
  model: MODEL,
  contents: { parts: [
    { inlineData: { data: imageBase64, mimeType } },
    { text: prompt },
  ]},
});
// Extract parts:
for (const part of candidate.content.parts) {
  if (part.inlineData?.mimeType?.startsWith('image/')) {
    remodelImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  } else if (part.text) {
    analysisText = part.text; // Real AI-written analysis with material names
  }
}

// Fire-and-forget webhook to Make.com (never blocks response)
if (makeWebhookUrl) {
  fetch(makeWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadName, leadPhone, serviceType, analysis: confirmedAnalysis }),
  }).catch(console.error);
}

// Return — NO sullyText in payload
return NextResponse.json({ success: true, analysis: confirmedAnalysis, remodelImage, attribution, model, timestamp });
```

**CORS (Mandatory)**: Every Hub route MUST define `corsHeaders` with `"Access-Control-Allow-Origin": "*"` and export an `OPTIONS()` handler returning `204 No Content`. Attach headers to ALL response branches (200, 401, 400, 500).

### 4.2 Component Build
Create an AIRemodel page featuring the `<ComparisonSlider>` component and a multi-step project intake form.

**V4.4 'Phone-First' Intake Form Standard**:
- **Primary Contact**: Remove the mandatory 'Email' field. Replace it with a mandatory 'Mobile Phone Number' field.
- **Custom Notes**: Add a multi-line 'Project Details/Notes' field to the final step.
- **'Other' Style Logic**: Add 'Other' to the Style dropdown. When selected, reveal a text input for 'Custom Style Description'.

**Standardized Room Types**: Every implementation MUST support: Kitchen, Bathroom, Living Room, Master Bedroom, Home Office, Dining Room, Exterior/Outdoor, and Commercial Space.

**The "Intensity" Logic**: The form must pass a `remodelIntensity` parameter to the Hub. The Hub's prompt MUST adhere to these definitions:
- **Light Refresh**: Paint, fixtures, lighting updates ($5k–$15k). Keep existing flooring and major features.
- **Moderate Remodel**: New flooring, updated cabinets/countertops, hardware ($20k–$50k). Significant transformation within the existing layout.
- **Complete Transformation**: Luxury gut renovation, professional-grade finishes, high-end materials ($50k+). Magazine-quality "After" shot.

**Spatial Lock Protocol**: The Hub prompt MUST strictly command the AI to:
- `"Generate ONLY a single remodeled image — no split-screen or comparisons."`
- `"Keep the room's basic dimensions and layout intact."`
- `"Maintain identical camera angle and field of view. Keep all architectural anchors (doors, windows, ceiling height) in place."`

### 4.3 Result Layout (Cinematic — Hard-Wired Standard)

The result view is **ComparisonSlider → Architectural Analysis → CTAs → Status Line**. No Sully widget. No chat bubbles.

**Standard 1 — ComparisonSlider**: ALL AI Remodel results MUST render `<ComparisonSlider>` with `beforeSrc={imagePreview}` and `afterSrc={result.remodelImage}`. If `remodelImage` is null, show the uploaded image with a graceful fallback label. Never use a static side-by-side grid.

  > **Orientation Rule (Critical)**: BEFORE fills the full background (left side). AFTER is clipped and reveals from the RIGHT as the user drags right. The clip formula for the After overlay MUST be `clipPath: inset(0 0 0 ${position}%)` — do NOT use `inset(0 ${100 - position}% 0 0)` which reverses the images.

**Standard 2 — Architectural Analysis (Full-Width Hero)**: The analysis box MUST be full-width below the slider — NOT in a 2-column grid with CTAs. Use generous padding (`2.5rem 3rem`), a 4px Trust Blue left border, and readable prose sizing (`1.05rem`, `line-height: 2`, `max-width: 72ch`). The analysis text is AI-written by Gemini (materials + lighting + style) and mapped from `result.analysis`.

**Standard 3 — Branded Download**: A 'Download Comparison' button MUST be present, wired to a client-side Canvas utility that stitches a 1920px wide JPG (Before left / After right). Render in a horizontal flex row alongside the primary CTA.

**Standard 4 — Status Line**: Below the CTAs, always render a confirmation line:
> `"A project manager from [Contractor Name] has been notified and will reach out shortly with your custom quote."`
Pair it with a `<CheckCircle>` icon in Trust Blue.

### 4.4 Functional Requirements
- **Image Preview**: Render an immediate thumbnail of the user's upload on step 1 selection.
- **Canvas Stitching**: Implement a client-side Canvas utility to generate a 1920px wide JPG comparison (Before vs. After) for user download.
- **Conversion Wall**: Require Name and Mobile Phone via a multi-step form before displaying the visualization (Email is no longer required).
- **NO Sully Widget**: Do not implement `sullyText` state, `<SullyAssistant />`, or any floating AI chat widget in the result view. Sully has been removed from all Spoke UI. The Make.com webhook handles lead routing in the background.


## 5. Lead Engine & Service Architecture
* [cite_start]**Service Creation**: Automatically generate `leadService.ts` in `/src/services`[cite: 15].
* [cite_start]**The "Buzz" Rule**: The `submitLead` function must post to the `process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL`[cite: 15, 16].
* [cite_start]**Mandatory Attribution**: Every lead submission must include `attribution: "High-Intent Lead generated by Max Walters Video"`[cite: 15, 16].
* [cite_start]**Validation**: Include a `timestamp` and hardcoded `location: "Calabasas / 818 Area"` in every payload[cite: 15, 16].
Automatic Spoke Provisioning: During the creation of .env.local, the agent MUST automatically insert:

NEXT_PUBLIC_HUB_URL="https://max-walters-ai-hub.vercel.app"

NEXT_PUBLIC_HUB_SECRET="max_secure_vault_2026"

NEXT_PUBLIC_SITE_ID="[Current-Project-Slug]"
Compliance Footer: All sites must include a Mobile Consent clause in the Privacy Policy and a direct link to the contractor's CSLB License in the footer.

Provisioning: The .env.local must now include NEXT_PUBLIC_SULLY_ACTIVE="true".

## 6. Deployment & SSD Guardrails
* [cite_start]**Headless Deployment**: Utilize the **Vercel REST API** for deployments to bypass Git-related latency[cite: 539, 639].
* [cite_start]**SSD Maintenance**: Include a `"clean": "dot_clean ."` script in `package.json` to remove Mac metadata from the T7 Shield SSD before builds[cite: 16].

## 7. Make.com Webhook — Lead Routing (Fire-and-Forget)

Sully has been **permanently removed** from the Spoke UI and Hub generation pipeline.

The `MAKE_SULLY_WEBHOOK_URL` env var is repurposed as the **lead routing webhook**. The Hub fires it non-blocking after image generation:

**Contractor Alert Protocol**: Ensure `SITE_ID` is attached to every payload. The backend (Make.com) will use this ID to look up the contractor's mobile number and trigger an instant SMS alert.

```typescript
// Fire-and-forget — never awaited, never blocks the response
if (makeWebhookUrl) {
  fetch(makeWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteId:         process.env.NEXT_PUBLIC_SITE_ID,
      leadName:       name    || 'Homeowner',
      leadPhone:      phone   || 'N/A',
      roomType:       roomType || 'General Remodel',
      style:          style   || 'Modern',
      intensity:      intensity || 'Moderate Remodel',
      customNotes:    notes   || '',
      analysis:       confirmedAnalysis,
      remodelImageURL: imageProxyUrl || '',
    }),
  }).catch(console.error);
}
```

**Hub response payload (final):**
```json
{ "success": true, "analysis": "...", "remodelImage": "data:image/jpeg;base64,...", "attribution": "Vision by Max Walters", "model": "gemini-2.5-flash-image", "timestamp": "..." }
```
No `sullyText` key is returned. The Spoke does not map or render Sully text.

**`NEXT_PUBLIC_SULLY_ACTIVE` is deprecated.** Remove it from all `.env.local` files.
## 8. Zero-Placeholder Policy (Pre-Flight) — Non-Negotiable

**Before every production build, you MUST run a grep check across all .env files:**

```bash
grep -r "PLACEHOLDER\|YOUR_URL\|YOUR_ZAPIER\|YOUR_MAKE\|WEBHOOK_URL_HERE" .env* && echo "🚨 ABORT: Placeholder values detected." && exit 1
```

**If any placeholder string is found, the build MUST be aborted immediately.**

Broken lead transmission is a critical business failure. A site that silently drops leads is worse than no site.

**Enforcement in Code (Mandatory):**

Every `leadService.ts` implementation MUST include an `assertWebhookUrl()` guard at the top of `submitLead` that:
1. Throws if `NEXT_PUBLIC_LEAD_WEBHOOK_URL` is empty.
2. Throws if it matches any known placeholder pattern (`YOUR_ZAPIER`, `YOUR_URL`, `PLACEHOLDER`, `YOUR_MAKE`, `WEBHOOK_URL_HERE`).
3. Emits this exact console message before throwing: `❌ CRITICAL: Lead Webhook is a placeholder. Update .env.local and restart.`

**The standard pattern is:**
```typescript
const PLACEHOLDER_PATTERNS = ['YOUR_ZAPIER', 'YOUR_URL', 'PLACEHOLDER', 'YOUR_MAKE', 'WEBHOOK_URL_HERE'];
function assertWebhookUrl(url: string): void {
  if (!url || PLACEHOLDER_PATTERNS.some(p => url.toUpperCase().includes(p))) {
    const msg = '❌ CRITICAL: Lead Webhook is a placeholder. Update .env.local and restart.';
    console.error(msg);
    throw new Error('LEAD_ENGINE_MISCONFIGURED: ' + msg);
  }
}
```

## 11. Agency Content Management

**Site Isolation**: All client-specific assets (photos, logos, text) must live in `/src/sites/[SITE_ID]/`. Never mix assets between folders.

**Automated Metadata**: When the user asks to add a portfolio project or update content in 'Plain English,' the AI is responsible for generating the necessary JSON/Config files in that site's folder. The user should never be asked to edit JSON.

**Architectural Copywriting**: When new photos are added, the AI must analyze the images and draft an elegant, high-end architectural description (2-3 sentences) automatically.

**Zero-Mixup Verification**: Before any update, the AI must verify that the `SITE_ID` being edited matches the folder path being used.

**Multi-Tenant Engine**: Any UI improvements to the 'Core Engine' (sliders, analysis layout, etc.) must be applied to the master components so all sites benefit from the update simultaneously.

## 12. Master Blueprint Architecture

**Strict Environment Isolation**: All business logic (branding, routing, analytics) MUST be driven by `process.env.NEXT_PUBLIC_SITE_ID`. Hard-coding client names or IDs into the core engine is a critical failure.

**The 'Global-First' Rule**: Any improvement to UI components, AI prompts, or performance must be made to the master template files so that every project connected to the repo benefits simultaneously.

**Client-Specific Overrides**: If a client requires a unique feature, use a conditional 'toggle' (e.g., `if (SITE_ID === 'johnhart') { showFeature }`). Do not create separate code files for individual clients unless authorized by the Director.

**Deployment Safety**: Before any 'Push to GitHub,' the AI must confirm that the build is clean and that no 'staging' or 'test' IDs have been accidentally committed to the production code.

## 13. Batch Agency Production

This protocol activates whenever I provide a list or CSV of contractors:

- **CSV Parsing**: Automatically extract 'Business Name', 'Location', and 'Niche'.
- **Autonomous Folder Creation**: For each entry, create `/src/sites/[site-id]/` and initialize the standard content files.
- **Specialist Delegation**: For every site created, you MUST consult and apply the instructions in `branding-skill.md` for visual identity, `copywriting-skill.md` for the 'Refined Specialist' voice, and `seo-skill.md` for local search optimization.
- **Visual Intelligence**: Use the Gemini API to analyze the contractor's existing online presence or "hallucinate" a high-end branding palette (OKLCH) based on your specialized branding rules.
- **Vercel CLI Automation**: For each site, run `vercel project add` and `vercel env add` to set the `SITE_ID` and `BUSINESS_NAME`.
- **Manifest Logging**: Update a master `agency-manifest.json` file in the root directory to track every site created and its Vercel URL.