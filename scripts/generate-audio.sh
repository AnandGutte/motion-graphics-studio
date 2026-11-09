#!/bin/bash
set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$PROJECT_ROOT/public/audio"

cd "$PROJECT_ROOT"

VOICE="Samantha"
RATE=185 # slightly brisker YouTube Short pacing

echo "Generating narration lines with voice $VOICE (rate: $RATE)..."

say -v "$VOICE" -r "$RATE" "What if the Sun suddenly vanished?" -o public/audio/scene1_raw.aiff
say -v "$VOICE" -r "$RATE" "Surprisingly, Earth wouldn't notice right away!" -o public/audio/scene2_raw.aiff
say -v "$VOICE" -r "$RATE" "That's because sunlight takes about eight minutes and twenty seconds to reach us." -o public/audio/scene3_raw.aiff
say -v "$VOICE" -r "$RATE" "Only after that delay would our sky finally go dark." -o public/audio/scene4_raw.aiff
say -v "$VOICE" -r "$RATE" "Even the gravitational change travels at the exact speed of light." -o public/audio/scene5_raw.aiff
say -v "$VOICE" -r "$RATE" "Because in our universe, nothing travels faster than light!" -o public/audio/scene6_raw.aiff

echo "Converting to WAV and normalizing..."
for i in {1..6}; do
  ./tools/bin/ffmpeg -y -i "public/audio/scene${i}_raw.aiff" -filter:a "volume=1.2" "public/audio/scene${i}.wav"
  rm "public/audio/scene${i}_raw.aiff"
done

echo "Synthesizing sound effects..."
# 1. Sun vanish pop / whoosh (filtered noise + low pop sweep)
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=180:duration=0.4" -af "afade=t=out:st=0.05:d=0.35,volume=1.5" public/audio/pop.wav

# 2. Light pulse chime / ping
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=880:duration=0.6" -af "afade=t=out:st=0.1:d=0.5,volume=0.8" public/audio/ping.wav

# 3. Deep space cinematic drone for the dark sky
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=65:duration=4.0" -af "afade=t=in:st=0:d=1.0,afade=t=out:st=2.5:d=1.5,volume=0.5" public/audio/drone.wav

# 4. Gravity swoosh / pulse
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=120:duration=1.2" -af "afade=t=out:st=0.2:d=1.0,volume=0.9" public/audio/gravity.wav

echo "All audio assets generated successfully."
ls -lh public/audio/
