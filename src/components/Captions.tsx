import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface CaptionsProps {
  primaryText: string;
  secondaryText?: string;
  badgeText?: string;
  accentColor?: string;
  position?: "top" | "center" | "bottom";
}

export const Captions: React.FC<CaptionsProps> = ({
  primaryText,
  secondaryText,
  badgeText,
  accentColor = "#FBBF24",
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const yOffset =
    position === "top" ? 220 :
    position === "center" ? 900 :
    1420; // safe from YouTube bottom UI

  return (
    <div
      style={{
        position: "absolute",
        top: yOffset,
        left: 0,
        width: 1080,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 50,
        opacity,
        transform: `scale(${scaleSpring})`,
        padding: "0 60px",
        boxSizing: "border-box",
      }}
    >
      {/* Category / Context Badge */}
      {badgeText && (
        <div
          style={{
            backgroundColor: accentColor,
            color: "#0F172A",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 16,
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          {badgeText}
        </div>
      )}

      {/* Primary Bold Caption Box */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.88)",
          backdropFilter: "blur(12px)",
          border: `2px solid ${accentColor}`,
          borderRadius: 24,
          padding: "20px 36px",
          textAlign: "center",
          boxShadow: `0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px ${accentColor}33`,
          maxWidth: 960,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "0.04em",
            color: "#FFFFFF",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {primaryText}
        </div>

        {secondaryText && (
          <div
            style={{
              marginTop: 12,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: "0.02em",
            }}
          >
            {secondaryText}
          </div>
        )}
      </div>
    </div>
  );
};
