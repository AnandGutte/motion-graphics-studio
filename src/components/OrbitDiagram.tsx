import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface OrbitDiagramProps {
  rippleProgress?: number; // 0 to 1 (when 1, hits Earth)
  releaseTangent?: boolean;
}

export const OrbitDiagram: React.FC<OrbitDiagramProps> = ({
  rippleProgress = 0,
  releaseTangent = false,
}) => {
  const frame = useCurrentFrame();

  const centerX = 540;
  const centerY = 960;
  const orbitRadius = 340;

  // Orbit angle before release
  const baseAngle = (frame * 1.5) % 360;

  // Expanding gravitational wave radius
  const waveRadius = rippleProgress * orbitRadius * 1.4;

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
          <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Space-time curvature grid rings */}
        {[100, 180, 260, 340, 420].map((r, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="#1E293B"
            strokeWidth="2"
            strokeDasharray="4 6"
            opacity={0.7}
          />
        ))}

        {/* Previous elliptical orbit line */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          fill="none"
          stroke={releaseTangent ? "#64748B" : "#38BDF8"}
          strokeWidth="3"
          strokeDasharray={releaseTangent ? "6 6" : "none"}
          opacity={0.8}
        />

        {/* Expanding gravitational wave front */}
        {rippleProgress > 0 && (
          <circle
            cx={centerX}
            cy={centerY}
            r={waveRadius}
            fill="none"
            stroke="#A855F7"
            strokeWidth="5"
            opacity={Math.max(0, 1 - rippleProgress * 0.7)}
            filter="url(#waveGlow)"
          />
        )}

        {/* Central Sun location marker */}
        <circle
          cx={centerX}
          cy={centerY}
          r="16"
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
        />
        <line
          x1={centerX - 10}
          y1={centerY - 10}
          x2={centerX + 10}
          y2={centerY + 10}
          stroke="#EF4444"
          strokeWidth="3"
        />
        <line
          x1={centerX + 10}
          y1={centerY - 10}
          x2={centerX - 10}
          y2={centerY + 10}
          stroke="#EF4444"
          strokeWidth="3"
        />
        <text
          x={centerX}
          y={centerY + 45}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="20"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          letterSpacing="2"
        >
          SUN WAS HERE
        </text>

        {/* Tangent trajectory arrow when released */}
        {releaseTangent && (
          <g>
            <line
              x1={centerX + orbitRadius}
              y1={centerY}
              x2={centerX + orbitRadius}
              y2={centerY - 450}
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
            <polygon
              points={`${centerX + orbitRadius - 10},${centerY - 440} ${centerX + orbitRadius + 10},${centerY - 440} ${centerX + orbitRadius},${centerY - 465}`}
              fill="#F59E0B"
            />
            <text
              x={centerX + orbitRadius + 24}
              y={centerY - 220}
              fill="#F59E0B"
              fontSize="24"
              fontFamily="system-ui, sans-serif"
              fontWeight="800"
            >
              STRAIGHT LINE PATH!
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
