import { artifactSlots } from "./constants";

export interface ArtifactPieceData {
  name: string;
  imageUrl: string;
}

export interface DatasetData {
  [key: string]: string[][];
}

export type ArtifactSlotType = (typeof artifactSlots)[number];

export type ArtifactData = {
  [K in "check" | "artifactSet" | "mainStat" | "subStats"]: K extends "check"
    ? boolean
    : string;
};

export interface CharacterArtifactData {
  disabled: boolean;
  artifacts: Partial<Record<ArtifactSlotType, ArtifactData>>;
}

export interface UserArtifactData {
  __DISABLED: boolean;
  characters: Partial<Record<string, CharacterArtifactData>>;
}
