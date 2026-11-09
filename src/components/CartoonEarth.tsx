import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface CartoonEarthProps {
  size?: number;
  mood?: "happy" | "confused" | "sleepy" | "neutral";
  darkness?: number; // 0 (bright daylight) to 1 (pitch dark with city lights)
}

export const CartoonEarth: React.FC<CartoonEarthProps> = ({
  size = 320,
  mood = "happy",
  darkness = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle floating hover
  const floatY = Math.sin((frame / fps) * Math.PI) * 8;
  const continentPan = (frame * 0.4) % 240;

  // Blinking
  const blinkCycle = frame % 85;
  const isBlinking = blinkCycle > 80;

  // Eye direction for "confused" / "looking around"
  const eyeShiftX = mood === "confused" ? Math.sin((frame / 20) * Math.PI) * 8 : 0;
  const eyeShiftY = mood === "confused" ? -4 : 0;

  // Interpolated colors based on darkness
  const oceanColor = interpolate(darkness, [0, 1], [0, 1]); // will use opacity overlay
  const atmosphereOpacity = interpolate(darkness, [0, 1], [0.8, 0.2]);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `translateY(${floatY}px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-160 -160 320 320"
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id="earthSphereClip">
            <circle cx="0" cy="0" r="120" />
          </clipPath>

          {/* Daylight Ocean Gradient */}
          <radialGradient id="dayOcean" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </radialGradient>

          {/* Night Ocean Gradient */}
          <radialGradient id="nightOcean" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Atmosphere Glow */}
          <filter id="atmosphereGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Atmosphere Glow */}
        <circle
          cx="0"
          cy="0"
          r="132"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="10"
          opacity={atmosphereOpacity}
          filter="url(#atmosphereGlow)"
        />

        {/* Base Ocean Sphere (Day) */}
        <circle cx="0" cy="0" r="120" fill="url(#dayOcean)" />

        {/* Night Ocean Overlay */}
        <circle
          cx="0"
          cy="0"
          r="120"
          fill="url(#nightOcean)"
          opacity={darkness}
        />

        {/* Continents inside clipped sphere */}
        <g clipPath="url(#earthSphereClip)">
          {/* Sliding continent layer for gentle rotation effect */}
          <g transform={`translate(${continentPan - 120}, 0)`}>
            {/* Americas shape */}
            <path
              d="M -50 -80 C -20 -90, 0 -70, -10 -40 C -20 -10, 10 20, -10 60 C -30 100, -70 80, -60 40 C -50 0, -80 -70, -50 -80 Z"
              fill={darkness > 0.5 ? "#14532D" : "#22C55E"}
              stroke={darkness > 0.5 ? "#052E16" : "#16A34A"}
              strokeWidth="4"
            />
            {/* Eurasia / Africa shape */}
            <path
              d="M 60 -70 C 110 -80, 140 -40, 120 -10 C 100 20, 130 50, 100 80 C 70 100, 40 70, 50 30 C 60 -10, 20 -60, 60 -70 Z"
              fill={darkness > 0.5 ? "#14532D" : "#22C55E"}
              stroke={darkness > 0.5 ? "#052E16" : "#16A34A"}
              strokeWidth="4"
            />
            {/* Repeated continent wrap */}
            <path
              d="M 190 -80 C 220 -90, 240 -70, 230 -40 C 220 -10, 250 20, 230 60 C 210 100, 170 80, 180 40 Z"
              fill={darkness > 0.5 ? "#14532D" : "#22C55E"}
              stroke={darkness > 0.5 ? "#052E16" : "#16A34A"}
              strokeWidth="4"
            />
          </g>

          {/* City Lights overlay (glows when dark) */}
          {darkness > 0.2 && (
            <g opacity={interpolate(darkness, [0.2, 1], [0, 0.9])}>
              {/* Clusters of golden city light dots */}
              <circle cx="-30" cy="-30" r="3.5" fill="#FDE047" />
              <circle cx="-22" cy="-26" r="2.5" fill="#FACC15" />
              <circle cx="-38" cy="-18" r="3" fill="#FDE047" />
              <circle cx="-15" cy="20" r="3" fill="#FDE047" />
              <circle cx="-25" cy="35" r="2.5" fill="#FACC15" />
              <circle cx="50" cy="-40" r="3.5" fill="#FDE047" />
              <circle cx="65" cy="-30" r="3" fill="#FACC15" />
              <circle cx="70" cy="15" r="3.5" fill="#FDE047" />
              <circle cx="45" cy="40" r="2.5" fill="#FDE047" />
            </g>
          )}

          {/* Shadow vignette across one side */}
          <path
            d="M 0 -120 A 120 120 0 0 1 0 120 A 60 120 0 0 0 0 -120"
            fill="#020617"
            opacity={0.3 + darkness * 0.4}
          />
        </g>

        {/* Earth Cartoon Face */}
        <g>
          {/* Cheeks */}
          <circle cx="-42" cy="18" r="11" fill="#F472B6" opacity={0.5 - darkness * 0.3} />
          <circle cx="42" cy="18" r="11" fill="#F472B6" opacity={0.5 - darkness * 0.3} />

          {/* Eyes */}
          {isBlinking ? (
            <g stroke="#0F172A" strokeWidth="5" strokeLinecap="round">
              <line x1="-38" y1="-2" x2="-18" y2="-2" />
              <line x1="18" y1="-2" x2="38" y2="-2" />
            </g>
          ) : (
            <g fill="#0F172A">
              {/* Left eye */}
              <ellipse cx={-28 + eyeShiftX} cy={-4 + eyeShiftY} rx="10" ry="14" />
              <circle cx={-31 + eyeShiftX} cy={-8 + eyeShiftY} r="3.5" fill="#FFFFFF" />

              {/* Right eye */}
              <ellipse cx={28 + eyeShiftX} cy={-4 + eyeShiftY} rx="10" ry="14" />
              <circle cx={25 + eyeShiftX} cy={-8 + eyeShiftY} r="3.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Expression Mouth */}
          {mood === "happy" && (
            <path
              d="M -18 18 Q 0 36 18 18"
              fill="none"
              stroke="#0F172A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {mood === "confused" && (
            <g>
              {/* Slightly wobbly curved mouth */}
              <path
                d="M -16 22 Q -4 14 6 22 Q 14 26 20 20"
                fill="none"
                stroke="#0F172A"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Raised left eyebrow */}
              <path
                d="M -36 -24 Q -26 -32 -16 -24"
                fill="none"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          )}

          {mood === "sleepy" && (
            <path
              d="M -12 20 Q 0 28 12 20"
              fill="none"
              stroke="#0F172A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
    </div>
  );
};
