# Design Guidelines: 90s Music Pack Website Clone

## Design Approach
**Reference-Based Approach**: Drawing inspiration from retro gaming aesthetics, music streaming platforms like Spotify/Bandcamp, and 90s nostalgia design trends. The site should evoke the golden era of 90s music with modern web standards.

## Core Design Elements

### A. Color Palette
**Primary Colors (Dark Mode Default)**:
- Background: 280 15% 12% (deep purple-black)
- Surface: 280 10% 18% (charcoal purple)
- Primary: 280 80% 65% (vibrant purple)
- Secondary: 45 85% 55% (golden yellow accent)

**Light Mode**:
- Background: 280 20% 95% (light purple-gray)
- Surface: 280 15% 88% (soft lavender)
- Text: 280 25% 25% (dark purple)

### B. Typography
- **Primary Font**: Google Fonts "Orbitron" (futuristic, retro-tech feel)
- **Secondary Font**: Google Fonts "Inter" (clean readability)
- **Headings**: Bold Orbitron (24px-48px)
- **Body**: Inter Regular (16px)
- **Pack Titles**: Orbitron Medium (18px)

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 8, and 12
- Compact spacing: p-2, m-2
- Standard spacing: p-4, m-4, gap-4
- Section spacing: p-8, m-8
- Large spacing: p-12, m-12

### D. Component Library

**Navigation**:
- Sticky header with transparent background and blur effect
- Logo with retro cassette tape icon
- Minimal navigation links with glowing hover effects

**Music Pack Grid**:
- 4-column responsive grid (lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2)
- 150x150px album covers with rounded corners
- Hover effects: subtle scale transform and glow
- Pack titles below covers with release info

**Pack Detail Page**:
- Large album cover (300x300px) on left
- Pack description and track list on right
- Prominent download button with gradient background
- Audio waveform visualization (placeholder)

**Audio Player**:
- Compact player bar at bottom of viewport
- Play/pause, track navigation controls
- Retro-styled progress bar with neon accent

**Buttons**:
- Primary: Gradient purple-to-pink with rounded corners
- Download: Large CTA with subtle animation pulse
- Outline variant: Semi-transparent with blur background when over images

### E. Visual Treatments

**Gradients**:
- Hero section: Diagonal gradient from deep purple to dark blue
- Button backgrounds: Purple to magenta
- Card hover states: Subtle radial gradient overlay

**Background Elements**:
- Subtle grid pattern overlay
- Floating geometric shapes (triangles, circles) with low opacity
- Scanline effects on hero section for retro CRT monitor feel

## Images Section

**Hero Image**: Large background image featuring a collage of 90s music elements (cassette tapes, vinyl records, boom boxes) with purple/pink color overlay. Size: Full viewport height.

**Pack Covers**: 150x150px album artwork thumbnails for each music pack, featuring retro-styled graphics with neon colors and geometric patterns.

**Category Icons**: Small 32x32px icons representing different music genres (house, techno, pop) in a pixelated, 8-bit style.

**WhatsApp Button**: Floating contact button in bottom right with WhatsApp icon and subtle drop shadow.

## Key Design Principles

1. **Nostalgia-Driven**: Every element should evoke 90s music culture and aesthetics
2. **Content-First**: Music packs are the hero - clean presentation of album art and track info
3. **Retro-Future**: Blend 90s nostalgia with modern web design trends
4. **Audio-Focused**: Visual elements should complement, not compete with music content
5. **Accessibility**: High contrast ratios maintained across all color combinations

This design creates an immersive 90s music experience while maintaining modern usability and performance standards.