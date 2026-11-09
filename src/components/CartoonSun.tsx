import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface CartoonSunProps {
  size?: number;
  vanishAtFrame?: number; // relative frame inside component sequence
}

export const CartoonSun: React.FC<CartoonSunProps> = ({
  size = 360,
  vanishAtFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const introScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Calculate vanishing dynamics if vanishAtFrame is specified
  const isVanishing = vanishAtFrame !== undefined && frame >= vanishAtFrame;
  const vanishProgress = vanishAtFrame !== undefined ? Math.max(0, frame - vanishAtFrame) : 0;

  // Implosion scale: quick squash, stretch, then collapse to 0
  let currentScale = introScale;
  let opacity = 1;

  if (vanishAtFrame !== undefined && frame >= vanishAtFrame) {
    if (vanishProgress < 4) {
      // Anticipation expand
      currentScale = introScale * (1 + vanishProgress * 0.1);
    } else {
      // Rapid collapse to 0
      currentScale = Math.max(0, 1.4 - (vanishProgress - 3) * 0.28);
      if (currentScale <= 0) opacity = 0;
    }
  }

  // Shockwave expand when vanishing
  const shockwaveRadius = interpolate(vanishProgress, [2, 18], [0, size * 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(vanishProgress, [2, 18], [0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Continuous subtle idle animations
  const pulse = Math.sin((frame / fps) * Math.PI * 2) * 6;
  const rotation = (frame * 0.6) % 360;

  // Blinking: blink every ~70 frames
  const blinkCycle = frame % 75;
  const isBlinking = blinkCycle > 70;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Expanding shockwave burst on vanish */}
      {isVanishing && shockwaveOpacity > 0.01 && (
        <svg
          style={{ position: "absolute", overflow: "visible" }}
          width={size}
          height={size}
          viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
        >
          <circle
            r={shockwaveRadius}
            fill="none"
            stroke="#FFE600"
            strokeWidth={12 - vanishProgress * 0.5}
            opacity={shockwaveOpacity}
          />
          {/* Spark particles flying outward */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            const dist = shockwaveRadius * 0.9;
            return (
              <circle
                key={i}
                cx={Math.cos((angle * Math.PI) / 180) * dist}
                cy={Math.sin((angle * Math.PI) / 180) * dist}
                r={Math.max(0, 10 - vanishProgress * 0.5)}
                fill="#FFA500"
                opacity={shockwaveOpacity}
              />
            );
          })}
        </svg>
      )}

      {/* Main Sun Body */}
      {opacity > 0 && (
        <div
          style={{
            transform: `scale(${currentScale})`,
            opacity,
            transformOrigin: "center center",
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="-200 -200 400 400"
            style={{ overflow: "visible" }}
          >
            <defs>
              <radialGradient id="sunBodyGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="30%" stopColor="#FDE047" />
                <stop offset="70%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </radialGradient>

              <radialGradient id="sunCoronaGrad" cx="50%" cy="50%" r="50%">
                <stop offset="50%" stopColor="#FDE047" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#F97316" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
              </radialGradient>

              <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing outer corona */}
            <circle
              r={160 + pulse}
              fill="url(#sunCoronaGrad)"
              filter="url(#sunGlow)"
            />

            {/* Rotating sun rays (cartoon rounded petals) */}
            <g transform={`rotate(${rotation})`}>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <path
                    key={i}
                    d="M -16 -130 Q 0 -170 16 -130 Z"
                    fill="#F59E0B"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
            </g>

            {/* Sun core circle */}
            <circle
              r={130}
              fill="url(#sunBodyGrad)"
              stroke="#D97706"
              strokeWidth="6"
            />

            {/* Sun Face */}
            {/* Cheeks */}
            <circle cx="-55" cy="25" r="14" fill="#F87171" opacity="0.6" />
            <circle cx="55" cy="25" r="14" fill="#F87171" opacity="0.6" />

            {/* Eyes */}
            {isBlinking ? (
              <g stroke="#78350F" strokeWidth="6" strokeLinecap="round">
                <line x1="-50" y1="0" x2="-26" y2="0" />
                <line x1="26" y1="0" x2="50" y2="0" />
              </g>
            ) : (
              <g fill="#78350F">
                {/* Left eye with sparkle */}
                <ellipse cx="-38" cy="-5" rx="12" ry="16" />
                <circle cx="-42" cy="-10" r="4" fill="#FFFFFF" />

                {/* Right eye with sparkle */}
                <ellipse cx="38" cy="-5" rx="12" ry="16" />
                <circle cx="34" cy="-10" r="4" fill="#FFFFFF" />
              </g>
            )}

            {/* Happy Smile */}
            <path
              d="M -30 25 Q 0 52 30 25"
              fill="none"
              stroke="#78350F"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
