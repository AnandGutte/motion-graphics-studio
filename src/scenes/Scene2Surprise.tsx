import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonEarth } from "../components/CartoonEarth";
import { Captions } from "../components/Captions";

export const Scene2Surprise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating question mark spring
  const qMarkScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const qMarkFloat = Math.sin((frame / 15) * Math.PI) * 10;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060814",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("audio/scene2.wav")} startFrom={0} volume={1} />

      <Starfield speed={0.5} />

      {/* Warm sunlight streaming in from top-left */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 1000,
          height: 1000,
          background: "radial-gradient(circle, rgba(253, 224, 71, 0.28) 0%, rgba(6, 8, 20, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Prominent Question Mark above Earth */}
      <div
        style={{
          position: "absolute",
          top: 480 + qMarkFloat,
          left: 540,
          transform: `translate(-50%, -50%) scale(${qMarkScale})`,
          fontFamily: "system-ui, sans-serif",
          fontSize: 140,
          fontWeight: 900,
          color: "#FDE047",
          textShadow: "0 0 35px rgba(253, 224, 71, 0.8)",
          zIndex: 30,
        }}
      >
        ?
      </div>

      {/* Secondary mini question marks */}
      <div
        style={{
          position: "absolute",
          top: 600 - qMarkFloat,
          left: 240,
          transform: `scale(${Math.max(0, qMarkScale * 0.7)})`,
          fontSize: 90,
          fontWeight: 900,
          color: "#38BDF8",
          textShadow: "0 0 25px rgba(56, 189, 248, 0.6)",
        }}
      >
        ?
      </div>
      <div
        style={{
          position: "absolute",
          top: 640 + qMarkFloat,
          left: 820,
          transform: `scale(${Math.max(0, qMarkScale * 0.7)})`,
          fontSize: 90,
          fontWeight: 900,
          color: "#A855F7",
          textShadow: "0 0 25px rgba(168, 85, 247, 0.6)",
        }}
      >
        ?
      </div>

      {/* Center Stage Confused Cartoon Earth */}
      <div
        style={{
          position: "absolute",
          top: 920,
          left: 540,
          transform: "translate(-50%, -50%)",
        }}
      >
        <CartoonEarth size={440} mood="confused" darkness={0} />
      </div>

      {/* Captions */}
      <Captions
        badgeText="Wait... What?!"
        primaryText="NOTHING CHANGES YET!"
        secondaryText="Birds chirp. Sun shines. Why?"
        accentColor="#38BDF8"
        position="bottom"
      />
    </AbsoluteFill>
  );
};
