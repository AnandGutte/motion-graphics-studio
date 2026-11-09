import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { Starfield } from "../components/Starfield";
import { CartoonEarth } from "../components/CartoonEarth";
import { LightBeam } from "../components/LightBeam";
import { Captions } from "../components/Captions";

export const Scene4Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Last beam cutoff progress: travels across between frame 0 and 70
  const cutoffProgress = interpolate(frame, [10, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Earth darkness transition after beam passes (starts at frame 65)
  const darkness = interpolate(frame, [65, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient sun beam glow fading
  const sunGlowOpacity = interpolate(frame, [40, 80], [0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030408",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("audio/scene4.wav")} startFrom={0} volume={1} />
      {frame >= 65 && (
        <Audio src={staticFile("audio/drone.wav")} startFrom={0} volume={0.6} />
      )}

      {/* Deep space stars become brighter as sunlight fades */}
      <Starfield speed={0.3} />

      {/* Fading sunlight wash */}
      {sunGlowOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 1000,
            height: 1000,
            background: "radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(3, 4, 8, 0) 70%)",
            opacity: sunGlowOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Last incoming light beam */}
      {cutoffProgress < 1 && (
        <LightBeam
          startX={-100}
          startY={300}
          endX={540}
          endY={860}
          speed={30}
          cutoffProgress={cutoffProgress}
        />
      )}

      {/* Earth transitioning from day to night with city lights */}
      <div
        style={{
          position: "absolute",
          top: 860,
          left: 540,
          transform: "translate(-50%, -50%)",
        }}
      >
        <CartoonEarth
          size={440}
          mood={darkness > 0.6 ? "sleepy" : "confused"}
          darkness={darkness}
        />
      </div>

      {/* Captions */}
      {frame < 70 ? (
        <Captions
          badgeText="At 8m 20s Exact"
          primaryText="THE LAST LIGHT ARRIVES"
          secondaryText="The final photons reach our eyes..."
          accentColor="#FDE047"
          position="bottom"
        />
      ) : (
        <Captions
          badgeText="Worldwide Night"
          primaryText="THEN... SUDDEN DARKNESS!"
          secondaryText="City lights shine under an endless starry sky."
          accentColor="#38BDF8"
          position="bottom"
        />
      )}
    </AbsoluteFill>
  );
};
