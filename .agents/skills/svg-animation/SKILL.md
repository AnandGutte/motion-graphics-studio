---
name: svg-animation
description: "Techniques for vector graphics, procedural SVGs, scientific diagrams, and filter effects rendered in Remotion."
---

# SVG & Procedural Graphics Skill

## SVG Standards for Remotion
- Use standard React SVG attributes (`strokeWidth`, `stopColor`, `strokeDasharray`).
- **Resolution Independence**: Use `viewBox` coordinates centered at origin (e.g., `-300 -300 600 600`) for easy rotational transformations around the center.
- **Lighting & Corona Effects**:
  - Radial gradients (`<radialGradient>`) for stellar bodies and glowing objects.
  - SVG filters (`<feGaussianBlur>`, `<feComposite>`) for cinematic glows and bloom.
- **Procedural Particle Generation**:
  - Pre-generate deterministic coordinate arrays based on index math (`(i * 360) / count`) to avoid re-calculating random values per frame.
  - Animate rotation angle using `(frame * speed) % 360`.
