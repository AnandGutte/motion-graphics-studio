---
name: react-motion-graphics
description: "Guidelines and best practices for creating smooth declarative motion graphics, timing curves, and spring physics in React for video rendering."
---

# React Motion Graphics Skill

## Principles
1. **Determinism**: Every animation must be a pure function of `frame`. Never use `Date.now()`, `Math.random()` without seeding, or `requestAnimationFrame`.
2. **Spring Dynamics**: Use Remotion's `spring()` helper with tuned parameters:
   - `damping`: Higher values (15-20) for smooth settling; lower (8-12) for bouncy springiness.
   - `stiffness`: Defines velocity response (typically 80-120).
   - `mass`: Inertia weight (typically 0.5-1.2).
3. **Sequence Choreography**:
   - Use `<Sequence from={offset} durationInFrames={length}>` or frame offsets (`frame - delay`) to stagger visual elements.
   - Apply easing with `interpolate(..., { easing: Easing.bezier(...) })`.
4. **Layout**:
   - Prefer flexbox and absolute positioning via `<AbsoluteFill>` to avoid layout reflows during frame rasterization.
