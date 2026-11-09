# Multi-Production Architecture — Motion Graphics Studio

**Motion Graphics Studio** is a reusable framework designed to produce multiple distinct animated videos, series, and documentaries within a unified development and rendering pipeline.

---

## Architecture Overview

Instead of treating the repository as a single video project, Motion Graphics Studio organizes content into modular productions:

```
src/
├── components/                  # Shared vector graphic components (HUD, Earth, Sun, badges, typography)
├── animations/                  # Shared motion hooks, physics curves, spring configurations
├── compositions/                # Top-level Remotion compositions
├── scenes/                      # Scene choreography components
├── productions/                 # Production specifications and registries
│   ├── types.ts                 # Typed production schema
│   ├── sun-disappears/          # "What If the Sun Disappeared?" production
│   │   └── index.ts
│   └── README.md                # This guide
├── Root.tsx                     # Remotion composition registry
└── index.ts                     # Remotion entry point
```

---

## Defining a New Production

Each production defines a standardized specification implementing `ProductionDefinition` (`src/productions/types.ts`):

1. **Production Identifier**: Unique kebab-case ID (e.g. `quantum-computers`, `ai-transformers`, `deep-sea-vents`).
2. **Title & Theme**: Explainer title and narrative theme.
3. **Format & Canvas**: Dimensions (`1080x1920` for Shorts, `1920x1080` for landscape documentaries), frame rate (`30` or `60` FPS), and duration.
4. **Scene Choreography**: Chronological breakdown of scenes with start frame, duration, and rendering components.
5. **Narration & Audio**: Voice profile (e.g. `am_adam`, `af_heart`), loudness targets (-14 to -16 LUFS), and asset directories.
6. **Remotion Composition ID**: Registered composition identifier in `src/Root.tsx`.
7. **Output Naming**: Predictable MP4 path in `output/`.
8. **QA Requirements**: Silence limits, black frame thresholds, and safe area bounds.

---

## Registering Compositions in `Root.tsx`

To make a production discoverable by Remotion CLI and Remotion Studio:

```tsx
import { Composition } from "remotion";
import { sunDisappearsProduction } from "./productions/sun-disappears";
import { MainShort } from "./compositions/MainShort";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id={sunDisappearsProduction.compositionId}
        component={MainShort}
        durationInFrames={sunDisappearsProduction.format.durationInFrames}
        fps={sunDisappearsProduction.format.fps}
        width={sunDisappearsProduction.format.width}
        height={sunDisappearsProduction.format.height}
      />
    </>
  );
};
```

---

## Extensibility

While current productions leverage 2D vector animation with SVG and Remotion canvas rendering, this production schema is designed to integrate:
- **3D / Three.js / WebGL** scenes.
- **Blender** programmatic render integrations.
- **Multi-language neural narration** tracks.
- **Dynamic programmatic data feeds** (e.g., charts, timelines, scientific simulations).
