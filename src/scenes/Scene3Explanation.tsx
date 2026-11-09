import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonEarth } from "../components/CartoonEarth";
import { LightBeam } from "../components/LightBeam";
import { TimerBadge } from "../components/TimerBadge";
import { Captions } from "../components/Captions";

export const Scene3Explanation: React.FC = () => {
  const frame = useCurrentFrame();

  // Timer ticks smoothly from 0 to 1 between frame 20 and 190
  const timerProgress = interpolate(frame, [20, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070913",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("audio/scene3.wav")} startFrom={0} volume={1} />
      {frame >= 25 && frame < 35 && (
        <Audio src={staticFile("audio/ping.wav")} startFrom={0} volume={0.8} />
      )}
      {frame >= 120 && frame < 130 && (
        <Audio src={staticFile("audio/ping.wav")} startFrom={0} volume={0.8} />
      )}

      <Starfield speed={0.4} />

      {/* Top Banner: Digital Timer Badge */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 540,
          transform: "translate(-50%, -50%)",
          zIndex: 40,
        }}
      >
        <TimerBadge progress={timerProgress} />
      </div>

      {/* Left side: Sun former marker (ghost ring) */}
      <div
        style={{
          position: "absolute",
          top: 880,
          left: 140,
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg width="140" height="140" viewBox="-70 -70 140 140">
          <circle
            r="50"
            fill="none"
            stroke="#EF4444"
            strokeWidth="4"
            strokeDasharray="8 6"
          />
          <line x1="-30" y1="0" x2="30" y2="0" stroke="#EF4444" strokeWidth="4" />
          <line x1="0" y1="-30" x2="0" y2="30" stroke="#EF4444" strokeWidth="4" />
        </svg>
        <span
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: 800,
            color: "#EF4444",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Sun Vanished
        </span>
      </div>

      {/* Light Beam travelling from Sun to Earth */}
      <LightBeam
        startX={180}
        startY={880}
        endX={880}
        endY={880}
        speed={22}
        cutoffProgress={0}
      />

      {/* Right side: Earth awaiting the light */}
      <div
        style={{
          position: "absolute",
          top: 880,
          left: 920,
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CartoonEarth size={180} mood="happy" darkness={0} />
        <span
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: 800,
            color: "#60A5FA",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Earth
        </span>
      </div>

      {/* Speed of light indicator below beam */}
      <div
        style={{
          position: "absolute",
          top: 1060,
          left: 540,
          transform: "translate(-50%, -50%)",
          background: "rgba(30, 41, 59, 0.8)",
          borderRadius: 16,
          padding: "10px 24px",
          border: "1px solid #475569",
          fontSize: 22,
          fontWeight: 800,
          color: "#FDE047",
          letterSpacing: "0.08em",
        }}
      >
        SPEED OF LIGHT: 300,000 km/s
      </div>

      {/* Captions */}
      <Captions
        badgeText="Physics Reality"
        primaryText="8 MINUTES 20 SECONDS"
        secondaryText="Sunlight emitted before vanishing is still arriving!"
        accentColor="#FDE047"
        position="bottom"
      />
    </AbsoluteFill>
  );
};
