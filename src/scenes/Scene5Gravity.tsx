import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonEarth } from "../components/CartoonEarth";
import { OrbitDiagram } from "../components/OrbitDiagram";
import { Captions } from "../components/Captions";

export const Scene5Gravity: React.FC = () => {
  const frame = useCurrentFrame();

  const centerX = 540;
  const centerY = 840;
  const orbitRadius = 320;

  // Gravitational ripple expands from frame 10 to 55
  const rippleProgress = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waveHit = frame >= 55;

  // Earth position:
  // Before wave hit: circular orbit
  // After wave hit: straight line tangent moving upwards (-Y)
  let earthX = centerX + orbitRadius;
  let earthY = centerY;

  if (!waveHit) {
    const angle = (frame * 1.8 * Math.PI) / 180;
    earthX = centerX + Math.cos(angle) * orbitRadius;
    earthY = centerY + Math.sin(angle) * orbitRadius;
  } else {
    // Tangent release from the right side flying straight upwards
    const tangentFlyDist = (frame - 55) * 16;
    earthX = centerX + orbitRadius;
    earthY = centerY - tangentFlyDist;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030408",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("audio/scene5.wav")} startFrom={0} volume={1} />
      {frame >= 10 && frame < 20 && (
        <Audio src={staticFile("audio/gravity.wav")} startFrom={0} volume={0.9} />
      )}

      <Starfield speed={0.4} />

      {/* Orbit & Gravity Wave Visualization */}
      <OrbitDiagram rippleProgress={rippleProgress} releaseTangent={waveHit} />

      {/* Earth traveling in orbit or flying tangent */}
      <div
        style={{
          position: "absolute",
          top: earthY,
          left: earthX,
          transform: "translate(-50%, -50%)",
          zIndex: 30,
        }}
      >
        <CartoonEarth size={180} mood={waveHit ? "confused" : "neutral"} darkness={1} />
      </div>

      {/* Dynamic Captions */}
      <Captions
        badgeText="General Relativity"
        primaryText="GRAVITY HAS A SPEED LIMIT!"
        secondaryText="Earth keeps orbiting until the gravity wave arrives!"
        accentColor="#A855F7"
        position="bottom"
      />
    </AbsoluteFill>
  );
};
