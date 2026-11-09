import React from "react";
import { Composition } from "remotion";
import { MainShort } from "./compositions/MainShort";
import { SunScene } from "./scenes/SunScene";

export const Root: React.FC = () => {
  return (
    <>
      {/* 30-Second Production Short: What If The Sun Disappeared? */}
      <Composition
        id="SunDisappearsShort"
        component={MainShort}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
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
