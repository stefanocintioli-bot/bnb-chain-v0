# BNB Chain Official Brand System
# Extracted from Slides Material Library via DOM inspection — April 2026
# Source: Google Slides Material Library (Copy) — BNB Chain Marketing Team
# Last verified: April 19, 2026

---

## CRITICAL CORRECTIONS vs previous web presentations
The bnbchain-latam-intro presentation used WRONG values:
- Wrong font: was using Syne → CORRECT font is Space Grotesk
- Wrong gold: was using #F0B90B → CORRECT gold is #FFE900
- Wrong logo position: was top-left → CORRECT position is BOTTOM-LEFT
Every future presentation must use the values in this file.

---

## COLORS (DOM-verified)
--gold: #FFE900
--gold-muted: rgba(255,233,0,0.15)
--gold-border: rgba(255,233,0,0.3)
--bg: #0D0D0D
--text: #FFFFFF
--text-muted: #888888
--text-on-gold: #000000 (black text on gold backgrounds)
--card-bg: rgba(255,255,255,0.04)
--card-border: rgba(255,255,255,0.08)
--card-border-featured: 3px solid #FFE900

## TYPOGRAPHY (DOM-verified)
Headline font: Space Grotesk (Google Fonts)
Body font: Space Grotesk (same family, lighter weight)
Import: @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap')
NEVER use: Syne, Inter, Roboto, Arial, DM Mono, or system fonts
Headline size example confirmed: 77px on 720x405px slide canvas
Font weight headlines: 700
Font weight body: 400-500

## BACKGROUNDS (visually confirmed)
Base: solid #0D0D0D
Grid overlay: subtle mesh/grid pattern, low opacity (~0.04-0.06)
Geometric elements: large 3D dark spherical shapes
  - Color: slightly lighter than bg, charcoal (estimated rgba(255,255,255,0.06-0.10))
  - Effect: blurred, atmospheric
  - Glow: radial circular halos, cinematic/dramatic
  - These are NOT simple blurred circles — they are sphere-like with depth
Pattern code (approximate):
  background-image: 
    radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: cover, 40px 40px, 40px 40px;

## LOGO USAGE (visually confirmed)
Position on slides: BOTTOM-LEFT corner (not top-left)
Size: small, approximately 80-100px wide
On dark slides: white logo version
On gold slides: black logo version  
Hero/cover: yellow symbol (hexagon only) centered large
GitHub raw URLs:
  White logo: https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/logos/BNB_Chain_Logo_White.svg
  Yellow symbol: https://raw.githubusercontent.com/stefanocintioli-bot/bnb-chain-v0/main/logos/BNB_Chain_Symbol_Yellow.svg

## HEADERS & LABELS (visually confirmed)
Three label styles:
  1. Dark filled: bg rgba(255,255,255,0.1), white text, rounded corners
  2. Outline only: transparent bg, 1px solid rgba(255,255,255,0.3), white text
  3. Gold filled: bg #FFE900, black text, rounded corners
Shapes: pill (border-radius 20px+) and rectangular (border-radius 6-8px)
Special: tooltip badges with tail/pointer at bottom

## CARDS / BENTO CONTAINERS (visually confirmed — approximate)
Background: rgba(255,255,255,0.04) on #0D0D0D
Border: 1px solid rgba(255,255,255,0.08)
Border radius: approximately 8-12px
Featured/accent: gold left border 3px solid #FFE900
Stat display: large number in white or gold, small label above in muted

## SLIDE CANVAS
Dimensions: 720 x 405px (16:9)
Progress bar: thin gold line at bottom
Slide counter: bottom-right, small muted text
Watermark: "BUILD WEB3 WITH BNB CHAIN" bottom-right, very small

## STILL NEEDS VERIFICATION
- Exact grid pattern spacing
- Exact sphere/glow positioning per slide type
- Bento container exact border radius
- Table header background color
- Body font size scale (h1/h2/body/label hierarchy)

## HOW CLAUDE CODE USES THIS FILE
1. Read this file completely before writing any presentation code
2. Apply confirmed values directly — no substitutions
3. For unverified items: use the approximate values given
4. Never use Syne, DM Mono, or #F0B90B in BNB Chain presentations
5. Logo always bottom-left, not top-left
6. Gold is #FFE900, not #F0B90B
