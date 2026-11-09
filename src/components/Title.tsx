import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide up and fade in for main title
  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
    },
  });

  const titleOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  // Subtitle fade in slightly later
  const subOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [25, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          background: "linear-gradient(180deg, #FFFFFF 20%, #FFAA00 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 4px 30px rgba(255, 170, 0, 0.4)",
        }}
      >
        THE SUN
      </div>

      <div
        style={{
          marginTop: 20,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#94A3B8",
          textTransform: "uppercase",
        }}
      >
        Core Temp: 15,000,000°C
      </div>
    </div>
  );
};
