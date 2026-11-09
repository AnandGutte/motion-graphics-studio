import React from "react";
import { Composition } from "remotion";
import { SunScene } from "./scenes/SunScene";

export const Root: React.FC = () => {
  return (
    <Composition
      id="SunAnimation"
      component={SunScene}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
