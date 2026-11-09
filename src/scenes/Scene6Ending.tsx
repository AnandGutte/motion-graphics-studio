import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonEarth } from "../components/CartoonEarth";
import { Captions } from "../components/Captions";

export const Scene6Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle camera drift
  const scale = interpolate(frame, [0, 90], [1, 1.08]);

  const badgeSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020307",
        overflow: "hidden",
        transform: `scale(${scale})`,
      }}
    >
      <Audio src={staticFile("audio/scene6.wav")} startFrom={0} volume={1} />

      <Starfield speed={1.2} />

      {/* Speed of light summary badge */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 540,
          transform: `translate(-50%, -50%) scale(${badgeSpring})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
          border: "3px solid #F59E0B",
          borderRadius: 28,
          padding: "24px 44px",
          boxShadow: "0 10px 40px rgba(245, 158, 11, 0.35)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#F59E0B",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Cosmic Constant
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "0.06em",
            marginTop: 4,
          }}
        >
          c ≈ 300,000 km/s
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#94A3B8",
            marginTop: 4,
          }}
        >
          No signal can travel faster
        </div>
      </div>

      {/* Earth cruising through the stars */}
      <div
        style={{
          position: "absolute",
          top: 880,
          left: 540,
          transform: "translate(-50%, -50%)",
        }}
      >
        <CartoonEarth size={360} mood="happy" darkness={1} />
      </div>

      {/* Final Captions */}
      <Captions
        badgeText="Key Takeaway"
        primaryText="SPACE HAS A SPEED LIMIT!"
        secondaryText="Not even gravity or light can arrive instantly."
        accentColor="#F59E0B"
        position="bottom"
      />
    </AbsoluteFill>
  );
};
