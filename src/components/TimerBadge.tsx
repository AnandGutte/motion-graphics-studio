import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface TimerBadgeProps {
  progress: number; // 0 to 1
}

export const TimerBadge: React.FC<TimerBadgeProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Progress 0 to 1 maps to 0s to 500s (8m 20s)
  const totalSeconds = Math.floor(progress * 500);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(15, 23, 42, 0.9)",
        border: "3px solid #38BDF8",
        borderRadius: 24,
        padding: "16px 36px",
        boxShadow: "0 8px 30px rgba(56, 189, 248, 0.3)",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "0.2em",
          color: "#94A3B8",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Light Travel Time
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 72,
          fontWeight: 900,
          color: "#38BDF8",
          letterSpacing: "0.08em",
          textShadow: "0 0 20px rgba(56, 189, 248, 0.6)",
        }}
      >
        {formattedTime}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 22,
          fontWeight: 700,
          color: "#FDE047",
        }}
      >
        Distance: ~150 Million km
      </div>
    </div>
  );
};
