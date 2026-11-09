/**
 * Motion Graphics Studio — Production Type Definitions
 *
 * Defines the contract for all modular video productions within the studio.
 * Every production (Shorts, long-form documentaries, explainers) specifies
 * its metadata, timeline format, scene choreographies, audio requirements, and QA targets.
 */

import React from "react";

export interface ProductionScene {
  id: string;
  name: string;
  startFrame: number;
  durationInFrames: number;
  description: string;
  component?: React.ComponentType<any>;
}

export interface ProductionAudioConfig {
  narrationDirectory: string;
  voiceDefault?: string;
  targetLoudnessLUFS?: number;
  sfxDirectory?: string;
}

export interface ProductionFormat {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  aspectRatio: "9:16" | "16:9" | "1:1" | "4:5";
}

export interface ProductionQAConfig {
  maxSilenceSeconds?: number;
  targetLoudnessLUFS?: number;
  checkBlackFrames?: boolean;
  safeAreaMarginPercent?: number;
}

export interface ProductionDefinition {
  /** Unique kebab-case production identifier, e.g. 'sun-disappears' */
  id: string;
  /** Human-readable title of the production */
  title: string;
  /** High-level description and narrative theme */
  description: string;
  /** Format specification (dimensions, FPS, duration) */
  format: ProductionFormat;
  /** Scene breakdowns with frame bounds */
  scenes: ProductionScene[];
  /** Audio requirements and narration mapping */
  audio: ProductionAudioConfig;
  /** Default output filename */
  outputFilename: string;
  /** Remotion composition ID registered in Root.tsx */
  compositionId: string;
  /** Quality assurance validation parameters */
  qa: ProductionQAConfig;
}
