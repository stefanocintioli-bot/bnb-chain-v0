# Slides Learnings Log
# Format: [DATE] | [WHAT WORKED] | [WHAT TO IMPROVE]

## Instructions
1. Read this file before building any presentation in this project
2. Apply relevant learnings to improve the output
3. After completing a build, append observations
4. If unsure about something, note it here

## Log
[2026-04-30] | slides-master.md installed with 15 components | 
First presentation (Binance Day Peru) had issues with: setOpacity 
not existing in Apps Script, replaceAllText failing silently on 
special characters, bento cards not filling slide area. Solution: 
switched to web-based slides (HTML/CSS on Vercel) which gives full 
design control. Web approach is now the standard.

[2026-04-30] | Binance Day Peru v1 deployed | Cards and bullet rows 
were too small — needed min-height rules and 80-85% content area 
fill. CountUp animation works well. Particle fire effect on burn 
slide was engaging. Photo slides need gradient overlay 
linear-gradient(transparent 40%, rgba(0,0,0,0.92)).

[2026-04-30] | Brand system confirmed | Font: Space Grotesk ONLY. 
Gold: #FFE900 (NEVER #F0B90B). Background: #0D0D0D. Logo: 
bottom-left. Never use emoji as icons in slides — use SVG or 
unicode symbols from the Material Library icon set instead.

[2026-04-30] | AI LatAm Demo Day — 16 slides deployed to ai-latam-demo-day.vercel.app |
What worked: static HTML single-file approach with public/assets/ for images.
Vercel outputDirectory MUST be set to "." in vercel.json — without it, Vercel
detects the public/ folder and serves from there, skipping index.html.
apolo.jpg was NOT in the AI Demo Day folder — it was at ~/Documents/apolo.jpg (separate).
Luchi=i.jpg filename has a special "=" character — safe to rename to Luchi.jpg on copy.
16:9 stage scaling via JS (width/height ratio) works well for Streamyard backdrop use.
CountUp easeOut-cubic animation on slide 9 and 10 stats. 
Gold particle float effect on slide 10 (impact stat) adds engagement.
Flowchart layout (slides 7-8) with connected boxes + gold arrows reads well at backdrop size.
Speaker photo cards: 50% border-radius, object-fit cover, 110px size — good legibility.

[2026-05-01] | Fixed: hexagon opacity (0.18→0.06), footer logo size (26px→20px),
vertical centering on transition slides 6/11, vertical centering on content slides
7/8/9, removed Escrow Contract link from BuildersClaw (slides 5 and 14) |
Key learnings: (1) Divider slides MUST use cover-logo div (position:absolute, top-left)
instead of footer-logo — the footer-logo inside position:absolute .footer resolves
relative to the footer, not the slide, causing clipping. (2) justify-content:center
on the content wrapper fixes top-heavy flowchart/stat slides. (3) BNB symbol SVG
looks cleaner than full wordmark when placed inline with partner logos at equal height.
