/**
 * Production: What If the Sun Disappeared?
 *
 * Studio Production Identifier: 'sun-disappears'
 * Formats:
 *  - 30-Second YouTube Short (Active: 'SunDisappearsShort', 900 frames, 1080x1920 @ 30 FPS)
 *  - 3-Second Smoke Test ('SunAnimation', 90 frames, 1080x1920 @ 30 FPS)
 *  - Planned 2-3 Minute Extended Documentary (Phase 4, 3,600-5,400 frames)
 */

import { ProductionDefinition } from "../types";
import { MainShort } from "../../compositions/MainShort";
import { Scene1Hook } from "../../scenes/Scene1Hook";
import { Scene2Surprise } from "../../scenes/Scene2Surprise";
import { Scene3Explanation } from "../../scenes/Scene3Explanation";
import { Scene4Reveal } from "../../scenes/Scene4Reveal";
import { Scene5Gravity } from "../../scenes/Scene5Gravity";
import { Scene6Ending } from "../../scenes/Scene6Ending";

export const sunDisappearsProduction: ProductionDefinition = {
  id: "sun-disappears",
  title: "What If the Sun Disappeared?",
  description:
    "An educational motion graphics Short exploring the physics of light propagation, the speed limit of the universe, and the relativistic release of gravitational orbits when the Sun hypothetically vanishes.",
  format: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 900,
    aspectRatio: "9:16",
  },
  compositionId: "SunDisappearsShort",
  outputFilename: "output/sun-disappears-final.mp4",
  audio: {
    narrationDirectory: "public/audio",
    voiceDefault: "am_adam",
    targetLoudnessLUFS: -14,
    sfxDirectory: "public/audio",
  },
  scenes: [
    {
      id: "scene-1-hook",
      name: "The Vanishing Sun Hook",
      startFrame: 0,
      durationInFrames: 150,
      description: "Sun smiles alongside Earth before vanishing at frame 70 with an implosion effect.",
      component: Scene1Hook,
    },
    {
      id: "scene-2-surprise",
      name: "Daylight Lingers",
      startFrame: 150,
      durationInFrames: 150,
      description: "Earth remains bathed in sunlight; animated question marks convey initial confusion.",
      component: Scene2Surprise,
    },
    {
      id: "scene-3-explanation",
      name: "The 8-Minute Cosmic Delay",
      startFrame: 300,
      durationInFrames: 210,
      description: "Wide diagram with HUD timer showing 150 million km distance and speed of light delay.",
      component: Scene3Explanation,
    },
    {
      id: "scene-4-reveal",
      name: "Sudden Darkness & City Lights",
      startFrame: 510,
      durationInFrames: 180,
      description: "Final photon wave passes Earth; surface plunges into night and city lights illuminate.",
      component: Scene4Reveal,
    },
    {
      id: "scene-5-gravity",
      name: "Relativistic Orbital Drift",
      startFrame: 690,
      durationInFrames: 120,
      description: "Gravitational tether releases; Earth drifts into deep space at tangent velocity.",
      component: Scene5Gravity,
    },
    {
      id: "scene-6-ending",
      name: "Closing Call to Action",
      startFrame: 810,
      durationInFrames: 90,
      description: "Cold rogue Earth with animated subscribe prompt and social badges.",
      component: Scene6Ending,
    },
  ],
  qa: {
    maxSilenceSeconds: 0.5,
    targetLoudnessLUFS: -14,
    checkBlackFrames: true,
    safeAreaMarginPercent: 10,
  },
};

export { MainShort };
