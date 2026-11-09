import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Sun } from "../components/Sun";
import { Title } from "../components/Title";

export const SunScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle camera zoom
  const cameraScale = interpolate(frame, [0, 90], [1, 1.08]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07080D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "160px 40px",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Background radial gradient spotlight */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          width: 1200,
          height: 1200,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 120, 0, 0.18) 0%, rgba(10, 12, 20, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header Tag */}
      <div
        style={{
          fontSize: 24,
          letterSpacing: "0.3em",
          color: "#E2E8F0",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textTransform: "uppercase",
          fontWeight: 700,
          opacity: 0.85,
          borderBottom: "2px solid rgba(255, 170, 0, 0.5)",
          paddingBottom: 8,
        }}
      >
        Astrophysics Lab
      </div>

      {/* Central Visual: Animated Sun */}
      <div style={{ margin: "auto 0" }}>
        <Sun />
      </div>

      {/* Bottom Info Title */}
      <div style={{ marginBottom: 80 }}>
        <Title />
      </div>
    </AbsoluteFill>
  );
};
