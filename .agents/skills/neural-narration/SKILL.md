---
name: neural-narration
description: "Guidelines and procedures for generating high-quality on-device neural voiceovers using Kokoro MLX on Apple Silicon, normalizing loudness, and synchronizing with Remotion compositions."
---

# Neural Narration Skill (Kokoro MLX)

## Overview
This skill guides the production of expressive neural text-to-speech narration directly on Apple Silicon using `kokoro-mlx` in `science-video-lab`.

---

## 1. Project-Local Architecture & CLI

All neural voice operations execute inside the project-local Python virtual environment (`tools/venv/`) with weights cached in `.cache/huggingface/`.

### Command Usage
```bash
# Generate audio for any text:
./scripts/tts.sh --voice <voice-id> --speed <rate> --text "<script>" --output "<path.wav>"

# Example:
./scripts/tts.sh --voice am_adam --speed 1.05 --text "What if the Sun suddenly vanished?" --output public/audio/scene1_neural.wav
```

### Voice Selection Reference
- `am_adam`: Dynamic, bright, punchy American male voice. Best for fast-paced, high-retention YouTube Shorts hooks and explanations.
- `am_michael`: Authoritative, deep, documentary-style American male voice. Best for serious physics and cosmic scale topics.
- `af_heart`: Warm, expressive, highly clear American female voice. Best for friendly, engaging educational explainers.
- `bf_emma` / `bm_george`: British English voices for classic BBC-documentary style delivery.

---

## 2. Preparing Scripts for Natural Neural Speech

Neural TTS models infer prosody and inflection from punctuation:
1. **Punctuation Controls Rhythm**:
   - Use commas (`,`) for short rhythmic breath pauses (~150ms).
   - Use em-dashes (`—`) or ellipses (`...`) for dramatic scientific reveals (~350ms).
   - Use exclamation marks (`!`) to trigger energetic vocal inflection for hooks.
   - Use question marks (`?`) to generate natural rising intonation.
2. **Pronouncing Numbers and Scientific Units**:
   - Spell out large quantities phonetically if numbers sound rushed:
     - Prefer: `"one hundred and fifty million kilometers"` instead of `"150,000,000 km"`.
     - Prefer: `"three hundred thousand kilometers per second"` instead of `"300,000 km/s"`.
     - Prefer: `"eight minutes and twenty seconds"` instead of `"8m 20s"`.
3. **Phonetic Hints for Technical Terms**:
   - If a word is mispronounced, spell it phonetically or hyphenate (e.g. `"ein-stein"`, `"pho-ton"`).

---

## 3. Segmented Generation & Scene Timing

Never synthesize an entire 30-second script in a single audio file. Instead:
1. Generate **one audio file per scene/concept** (`scene1.wav`, `scene2.wav`, etc.).
2. Measure the exact duration with `ffprobe`:
   ```bash
   ./tools/bin/ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 file.wav
   ```
3. Map the duration to video frames at 30 FPS (`frames = duration_in_seconds * 30`).
4. Ensure the voice clip finishes **at least 10–15 frames (0.3–0.5s) before the scene ends** to avoid abrupt cuts and give visual transitions room to breathe.

---

## 4. Loudness Normalization & Audio Mixing (EBU R128)

To ensure vocal clarity over background sound effects and music:
1. **Voice Normalization**:
   Normalize speech to `-16 LUFS` (standard for mobile/online video):
   ```bash
   ./tools/bin/ffmpeg -i raw_voice.wav -af "loudnorm=I=-16:TP=-1.5:LRA=11" normalized_voice.wav
   ```
2. **Sound Effects Balancing**:
   - Sound effects (pops, pings, drones) should sit between `-18 dB` and `-24 dB` to never mask the narrator's voice.
   - Apply gentle low-pass or high-pass filtering to SFX so vocal formant frequencies (1 kHz – 4 kHz) remain pristine.
3. **Smooth Transitions**:
   Always apply an audio fade-out (`afade=t=out:st=...:d=0.2`) on music/drones before scene transitions.

---

## 5. Quality Assurance Checklist

- [ ] Audio duration matches composition frame boundaries.
- [ ] No clipping or inter-sample peaks (`TP <= -1.0 dB`).
- [ ] Clean beginnings and endings without click/pop artifacts.
- [ ] Pronunciation of numbers, units, and constants is natural.
- [ ] Voice volume is balanced across all scenes.
