import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Sun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance scale spring
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 0.8,
    },
  });

  // Continuous subtle pulse
  const pulse = Math.sin((frame / fps) * Math.PI * 2) * 8;
  const rotation = (frame * 0.4) % 360;
  const coronaGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.75, 0.95]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
      }}
    >
      <svg
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Radial gradient for the Sun core */}
          <radialGradient id="sunCore" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="25%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#FFA900" />
            <stop offset="100%" stopColor="#FF5500" />
          </radialGradient>

          {/* Radial gradient for outer corona */}
          <radialGradient id="coronaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="#FFA900" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF4500" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF2200" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="24" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer ambient glow */}
        <circle
          r={260 + pulse * 1.5}
          fill="url(#coronaGrad)"
          opacity={coronaGlow}
          filter="url(#glow)"
        />

        {/* Rotating solar rays / flares */}
        <g transform={`rotate(${rotation})`}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const rayLength = 220 + ((i % 3) * 15) + pulse;
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos((angle * Math.PI) / 180) * rayLength}
                y2={Math.sin((angle * Math.PI) / 180) * rayLength}
                stroke="#FFAA00"
                strokeWidth={6}
                strokeLinecap="round"
                opacity={0.6 + ((i % 4) * 0.1)}
              />
            );
          })}
        </g>

        {/* Counter-rotating secondary flares */}
        <g transform={`rotate(${-rotation * 0.7})`}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12 + 15;
            const rayLength = 205 + ((i % 2) * 20);
            return (
              <circle
                key={i}
                cx={Math.cos((angle * Math.PI) / 180) * rayLength}
                cy={Math.sin((angle * Math.PI) / 180) * rayLength}
                r={10 + (i % 3) * 3}
                fill="#FFCC00"
                opacity={0.8}
                filter="url(#glow)"
              />
            );
          })}
        </g>

        {/* Main Sun Body */}
        <circle
          r={175 + pulse}
          fill="url(#sunCore)"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};
