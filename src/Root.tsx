import React from "react";
import { Composition } from "remotion";
import { MainShort } from "./compositions/MainShort";
import { SunScene } from "./scenes/SunScene";
import { sunDisappearsProduction } from "./productions/sun-disappears";

export const Root: React.FC = () => {
  return (
    <>
      {/* 30-Second Production Short: What If The Sun Disappeared? */}
      <Composition
        id={sunDisappearsProduction.compositionId}
        component={MainShort}
        durationInFrames={sunDisappearsProduction.format.durationInFrames}
        fps={sunDisappearsProduction.format.fps}
        width={sunDisappearsProduction.format.width}
        height={sunDisappearsProduction.format.height}
      />

      {/* 3-Second Smoke Test Animation */}
      <Composition
        id="SunAnimation"
        component={SunScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
