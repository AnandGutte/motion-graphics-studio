import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface StarfieldProps {
  speed?: number;
}

export const Starfield: React.FC<StarfieldProps> = ({ speed = 1 }) => {
  const frame = useCurrentFrame();

  // Deterministic star generation (seeded math, no Math.random during render)
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 120; i++) {
      // Deterministic pseudorandom values based on index
      const x = ((i * 137.5) % 1080);
      const y = ((i * 269.3) % 1920);
      const size = 1.5 + ((i * 7) % 3.5);
      const flickerPhase = (i * 0.4) % (Math.PI * 2);
      const colorType = i % 5;
      const color =
        colorType === 0 ? "#93C5FD" : // soft blue
        colorType === 1 ? "#FED7AA" : // soft yellow
        colorType === 2 ? "#F472B6" : // soft pink
        "#FFFFFF";                   // bright white
      list.push({ x, y, size, flickerPhase, color, speedMult: 0.5 + ((i % 3) * 0.4) });
    }
    return list;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920">
        {stars.map((star, idx) => {
          const driftY = (star.y + frame * star.speedMult * speed) % 1920;
          const twinkle = interpolate(
            Math.sin((frame * 0.1) + star.flickerPhase),
            [-1, 1],
            [0.3, 1]
          );

          return (
            <circle
              key={idx}
              cx={star.x}
              cy={driftY}
              r={star.size}
              fill={star.color}
              opacity={twinkle}
            />
          );
        })}
      </svg>
    </div>
  );
};
