import React from "react";
import { Series } from "remotion";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Surprise } from "../scenes/Scene2Surprise";
import { Scene3Explanation } from "../scenes/Scene3Explanation";
import { Scene4Reveal } from "../scenes/Scene4Reveal";
import { Scene5Gravity } from "../scenes/Scene5Gravity";
import { Scene6Ending } from "../scenes/Scene6Ending";

export const MainShort: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: Hook (0s - 5s, frames 0 - 150) */}
      <Series.Sequence durationInFrames={150}>
        <Scene1Hook />
      </Series.Sequence>

      {/* Scene 2: Surprise (5s - 10s, frames 150 - 300) */}
      <Series.Sequence durationInFrames={150}>
        <Scene2Surprise />
      </Series.Sequence>

      {/* Scene 3: Explanation (10s - 17s, frames 300 - 510) */}
      <Series.Sequence durationInFrames={210}>
        <Scene3Explanation />
      </Series.Sequence>

      {/* Scene 4: Reveal (17s - 23s, frames 510 - 690) */}
      <Series.Sequence durationInFrames={180}>
        <Scene4Reveal />
      </Series.Sequence>

      {/* Scene 5: Gravity (23s - 27s, frames 690 - 810) */}
      <Series.Sequence durationInFrames={120}>
        <Scene5Gravity />
      </Series.Sequence>

      {/* Scene 6: Ending (27s - 30s, frames 810 - 900) */}
      <Series.Sequence durationInFrames={90}>
        <Scene6Ending />
      </Series.Sequence>
    </Series>
  );
};
