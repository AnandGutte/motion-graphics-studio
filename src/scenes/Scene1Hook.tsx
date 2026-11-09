import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonSun } from "../components/CartoonSun";
import { CartoonEarth } from "../components/CartoonEarth";
import { Captions } from "../components/Captions";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle camera zoom
  const scale = interpolate(frame, [0, 150], [1, 1.1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05060A",
        overflow: "hidden",
        transform: `scale(${scale})`,
      }}
    >
      {/* Audio elements */}
      <Audio src={staticFile("audio/scene1.wav")} startFrom={0} volume={1} />
      {frame >= 70 && (
        <Audio src={staticFile("audio/pop.wav")} startFrom={0} volume={1.2} />
      )}

      {/* Background Starfield */}
      <Starfield speed={0.8} />

      {/* Sun glow spotlight before vanishing */}
      {frame < 75 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 540,
            width: 900,
            height: 900,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(254, 240, 138, 0.25) 0%, rgba(5, 6, 10, 0) 70%)",
            opacity: interpolate(frame, [65, 75], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main Animated Sun in center-top */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 540,
          transform: "translate(-50%, -50%)",
        }}
      >
        <CartoonSun size={420} vanishAtFrame={70} />
      </div>

      {/* Earth orbiting in lower right */}
      <div
        style={{
          position: "absolute",
          top: 1100,
          left: 540,
          transform: "translate(-50%, -50%)",
        }}
      >
        <CartoonEarth size={280} mood="happy" darkness={0} />
      </div>

      {/* Dynamic Captions */}
      {frame < 70 ? (
        <Captions
          badgeText="Hypothetical Science"
          primaryText="WHAT IF THE SUN..."
          secondaryText="Suddenly Vanished?"
          accentColor="#FDE047"
          position="bottom"
        />
      ) : (
        <Captions
          badgeText="Shock Event!"
          primaryText="POOF! IT'S GONE!"
          secondaryText="Would we notice right away?"
          accentColor="#EF4444"
          position="bottom"
        />
      )}
    </AbsoluteFill>
  );
};
