**Name**: Production Orchestrator & Filesystem Guardian
**Description**: Automates directory organization, sequential batch processing, and filesystem hygiene.

## 1. Directory Organization Logic
- **Pathing**: Always verify the root path: `/Volumes/T7 Shield/ANTIGRAVITY/CONTRACTOR SITES/Contractor-Agency/Leads/`.
- **Formatting**: Create folders using the slug format: `[Business-Name]-[Niche]`.
- **Sub-folders**: Initialize `/site-code`, `/assets/branding`, and `/assets/stock` for every lead.
* **Visual Verification Audit**: During the assembly of PortfolioClient.tsx, verify that all metadata spans utilize the "Metadata Badge Standard." If light-grey text on a white/light background is detected, trigger an immediate CSS override.
* **The Pre-Flight Directive (Mandatory)**: Before triggering the Branding or Builder agents, the PM must analyze the /Leads folder and issue a "Composition Set."
    * **Variables**: Alignment Choice, Shape Language, Typography Personality.
Instruction: "I have analyzed the previous builds. For [Contractor Name], use the following Composition Set: [Variables]. Team, execute based on this directive."
Moodboard Alignment: As part of the Pre-Flight Directive, the Project Manager must specify which file from the /Moodboard/ folder the team should use as the "Inspiration Anchor."

Instruction: "For [Contractor Name], I have selected style-anchor-01.png from the Moodboard. Extract the shadow and spacing DNA from this image, but vary the alignment and colors to maintain the Zero-Clone standard."
Airtable Integration: Before building, verify the AIRTABLE_BASE_ID and AIRTABLE_API_KEY. The Orchestrator must ensure the contractor's row exists in the "Source of Truth" to fetch CSLB numbers and Sully's "Tone of Voice."

## 2. Sequential Batch Processing (CSV/JSON)
- **Queue Management**: Process leads one-by-one. Never start a second build until the first has passed the "Veto Checklist".
- **State Tracking**: Maintain a `batch_status.json` in the Leads folder to track "Completed" vs. "Pending" builds.
- **Token Efficiency**: Reference the `Test-Lead` (RFM) as a technical anchor to avoid rewriting boilerplate code.

## 3. Filesystem Hygiene (Anti-Loop Protocol)
- **Metadata**: Run `dot_clean .` on the project directory before every build to remove macOS resource forks.
- **Cache Purge**: If configuration changes are made, automatically run `rm -rf .next` and kill existing processes on port 3000/3001 before restarting.
Component Prop Audit: Before running npm run build, the agent must perform a regex scan of all .tsx files in @/components to ensure the style prop is not used on custom components (like ComparisonSlider) unless explicitly defined in the component's interface.
* Instruction: Favor Tailwind utility classes over inline style objects to ensure SSR compatibility and performance
The Library First Rule (Mandatory): Before generating any UI component (Footer, Navbar, ComparisonSlider, AIRemodel), the agent must check /Volumes/T7 Shield/ANTIGRAVITY/Global-Library/Verified-Components/.

If a match is found: Copy the code exactly. You are only permitted to change the Tailwind utility classes to match the new build’s colors (e.g., changing bg-stone-900 to bg-trust-blue).

If no match is found: Build the component from scratch, ensuring it follows the "Client-Side Separator" rule.