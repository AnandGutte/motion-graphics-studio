---
name: remotion-video
description: "Author, configure, and render programmatic video compositions using Remotion and React in this workspace."
---

# Remotion Video Skill

## Overview
This skill guides the creation and rendering of programmatic videos using Remotion v4 inside `science-video-lab`.

## Workspace Tooling
Always execute commands using the workspace runner:
```bash
./scripts/run-in-env.sh remotion <command>
# Or via npm script:
./scripts/npm.sh run build
```

## Composition Architecture
- **Root**: Registered in `src/index.ts` pointing to `src/Root.tsx`.
- **Compositions**: Defined with explicit `id`, `fps` (typically 30 or 60), `durationInFrames`, `width` (1080 for 9:16 Shorts), and `height` (1920 for 9:16 Shorts).
- **Hooks**:
  - `useCurrentFrame()`: Returns the integer frame currently rendering.
  - `useVideoConfig()`: Access `fps`, `width`, `height`, and `durationInFrames`.
  - `interpolate(frame, inputRange, outputRange, options)`: Maps frame values to animated CSS/SVG properties.
  - `spring({ frame, fps, config })`: Realistic physics-based spring animations.

## Rendering
```bash
./scripts/render.sh
# Target output: output/<composition-name>.mp4
```
All caches are automatically contained in `.cache/remotion` and `.cache/puppeteer`.
