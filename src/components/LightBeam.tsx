import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface LightBeamProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  speed?: number;
  cutoffProgress?: number; // 0 (full continuous stream) to 1 (last beam exits)
}

export const LightBeam: React.FC<LightBeamProps> = ({
  startX = 120,
  startY = 960,
  endX = 960,
  endY = 960,
  speed = 12,
  cutoffProgress = 0,
}) => {
  const frame = useCurrentFrame();

  const totalDist = Math.hypot(endX - startX, endY - startY);
  const angle = Math.atan2(endY - startY, endX - startX);

  // Photons count
  const photonCount = 14;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="beamTrail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
            <stop offset="60%" stopColor="#FDE047" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient guiding trail line */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="8 8"
          opacity={Math.max(0, 0.4 - cutoffProgress * 0.4)}
        />

        {/* Photons streaming across */}
        {Array.from({ length: photonCount }).map((_, i) => {
          // Continuous cycling distance
          const offsetDist = ((frame * speed + (i * totalDist) / photonCount) % totalDist);

          // If cutoffProgress is active, photons before cutoff are eliminated
          const cutoffDistance = cutoffProgress * totalDist;
          if (cutoffProgress > 0 && offsetDist < cutoffDistance) {
            return null;
          }

          const currentX = startX + Math.cos(angle) * offsetDist;
          const currentY = startY + Math.sin(angle) * offsetDist;

          return (
            <g key={i} transform={`translate(${currentX}, ${currentY}) rotate(${(angle * 180) / Math.PI})`}>
              {/* Photon tail */}
              <line
                x1="-40"
                y1="0"
                x2="0"
                y2="0"
                stroke="url(#beamTrail)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Glowing head */}
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="#FFFFFF"
                filter="url(#lightGlow)"
              />
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#FEF08A"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
