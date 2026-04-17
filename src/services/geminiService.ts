/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  geminiService.ts — STABLE v4.3 (Synchronous Sully Bridge)        ║
 * ║  Spatial Lock Protocol + Intensity Logic                           ║
 * ║  Max Walters AI Hub · Spoke Client                               ║
 * ║  Global-Library / Verified-Components                            ║
 * ║                                                                  ║
 * ║  All AI vision requests are routed through the central Hub.      ║
 * ║  Direct Gemini API calls are intentionally removed.              ║
 * ║                                                                  ║
 * ║  Required .env.local keys:                                       ║
 * ║    NEXT_PUBLIC_HUB_URL          — Hub deployment URL             ║
 * ║    NEXT_PUBLIC_HUB_MASTER_SECRET — Shared auth secret            ║
 * ║    NEXT_PUBLIC_SITE_ID          — Unique spoke identifier        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "";
const HUB_SECRET = process.env.NEXT_PUBLIC_HUB_MASTER_SECRET || "";
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || "unknown-spoke";

// ── Type Definitions ─────────────────────────────────────────────────────────

export interface HubRemodelParams {
  imageBase64: string; // raw base64, no data URI prefix
  mimeType: string;    // e.g. "image/jpeg"
  style?: string;      // e.g. "Coastal California Modern"
  roomType?: string;   // Standardized: Kitchen | Bathroom | Living Room | Master Bedroom | Home Office | Dining Room | Exterior/Outdoor | Commercial Space
  remodelIntensity?: 'Light Refresh' | 'Moderate Remodel' | 'Complete Transformation'; // V4.3 Intensity tier
  prompt?: string;     // optional full custom prompt override
  // ── Universal Dispatcher fields ─────────────────────────────────
  name?: string;       // lead's full name
  phone?: string;      // lead's phone number
  service?: string;    // service of interest from the form
  customNotes?: string; // specific user requests
}

export interface HubRemodelResult {
  analysis: string;              // AI narrative / recommendation text
  sullyText: string;             // Sully's synchronous drafted response for the on-site widget
  remodelImage?: string;         // Full data URI of AI-generated after image (data:image/jpeg;base64,...)
  attribution: string;           // "Vision by Max Walters"
  model: string;                 // Model used by Hub
  siteId: string;                // Echo of the calling spoke
  timestamp: string;             // ISO 8601
}

// ── Guard ────────────────────────────────────────────────────────────────────

function assertConfig(): void {
  if (!HUB_URL) {
    throw new Error(
      `[${SITE_ID}] Hub spoke misconfiguration: NEXT_PUBLIC_HUB_URL is not set in .env.local`
    );
  }
  if (!HUB_SECRET) {
    throw new Error(
      `[${SITE_ID}] Hub spoke misconfiguration: NEXT_PUBLIC_HUB_MASTER_SECRET is not set in .env.local`
    );
  }
}

// ── Utility ──────────────────────────────────────────────────────────────────

/**
 * Converts a browser File object to a base64 string and its MIME type.
 * Safe to call client-side only.
 */
export async function fileToBase64(
  file: File
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? result;
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

// ── Core Hub Call ────────────────────────────────────────────────────────────

/**
 * Sends an image to the Max Walters AI Hub for remodel analysis.
 * Returns the Hub's structured response including attribution.
 *
 * @throws {Error} on config issues, network failures, or non-2xx responses.
 */
export async function generateRemodelVision(
  params: HubRemodelParams
): Promise<HubRemodelResult> {
  assertConfig();

  const { imageBase64, mimeType, style, roomType, prompt } = params;

  // ── V4.3 Spatial Lock Protocol prompt ──────────────────────────────
  const intensityMap: Record<string, string> = {
    'Light Refresh':           'Paint, fixtures, and lighting only ($5k–$15k). Keep all existing flooring and major architectural features.',
    'Moderate Remodel':        'New flooring, updated cabinets/countertops, and hardware ($20k–$50k). Significant transformation within the existing layout.',
    'Complete Transformation': 'Luxury gut renovation with professional-grade finishes and high-end materials ($50k+). Magazine-quality result.',
  };
  const intensityInstruction = intensityMap[params.remodelIntensity ?? ''] ?? intensityMap['Moderate Remodel'];

  const resolvedPrompt =
    prompt?.trim() ||
    `You are a professional architectural visualization AI for ${process.env.NEXT_PUBLIC_BUSINESS_NAME} in Camarillo, California.

SPATIAL LOCK PROTOCOL (MANDATORY — never deviate):
1. Generate ONLY a single remodeled image — no split-screen, no before/after composites.
2. Keep the room's basic dimensions and layout intact. Do NOT add or remove walls, windows, or doors.
3. Maintain identical camera coordinates, lens distortion, and architectural anchors (doors, windows, ceiling lines).

ROOM: ${roomType ?? 'room'}
STYLE: ${style ?? 'Coastal California Modern'}
INTENSITY: ${intensityInstruction}

Deliver a photorealistic architectural render at magazine editorial quality. Local context: Camarillo, CA coastal climate. Specify marine-rated materials and finishes appropriate for salt-air exposure. [Spoke: ${SITE_ID}]`;

  const endpoint = `${HUB_URL.replace(/\/$/, "")}/api/remodel`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hub-secret": HUB_SECRET,
        "x-spoke-id": SITE_ID,
      },
      body: JSON.stringify({
          imageBase64,
          mimeType,
          prompt: resolvedPrompt,
          // ── Universal Dispatcher context ──────────────────────────
          siteId: SITE_ID,
          name: params.name,
          phone: params.phone,
          service: params.service ?? params.roomType,
          remodelIntensity: params.remodelIntensity,
          customNotes: params.customNotes,
        }),
    });
  } catch (networkErr) {
    throw new Error(
      `[${SITE_ID}] Network error reaching Hub at ${endpoint}. Check connectivity. (${String(networkErr)})`
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error ?? response.statusText;
    } catch {
      detail = response.statusText;
    }
    throw new Error(
      `[${SITE_ID}] Hub returned ${response.status}: ${detail}`
    );
  }

  const data = await response.json();

  return {
    analysis:     data.analysis     ?? "No analysis returned.",
    sullyText:    data.sullyText    ?? "Thanks! Our team will review your design and reach out shortly.",
    remodelImage: data.remodelImage ?? undefined, // full data URI | undefined
    attribution:  data.attribution  ?? "Vision by Max Walters",
    model:        data.model        ?? "unknown",
    siteId: SITE_ID,
    timestamp: data.timestamp ?? new Date().toISOString(),
  };
}

// ── Convenience wrapper ───────────────────────────────────────────────────────

/**
 * V4.3 — Returns the full dual-payload { analysis, sullyText } so the
 * AI Remodel page can populate both the analysis panel and the Sully
 * Assistant Card in a single awaited call.
 */
export async function generateRemodel(params: HubRemodelParams): Promise<HubRemodelResult> {
  return generateRemodelVision(params);
}
