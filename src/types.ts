export type ArtifactSlotType =
  | "flower"
  | "plume"
  | "sands"
  | "goblet"
  | "circlet";

export interface DatasetData {
  [key: string]: string[][];
}

export interface ArtifactData {
  check: boolean;
  artifactSet: string;
  mainStat: string;
  subStats: string;
}

export interface CharacterArtifactData {
  disabled: boolean;
  artifacts: Partial<Record<ArtifactSlotType, ArtifactData>>;
}

export interface UserArtifactData {
  __DISABLED: boolean;
  __VERSION: number;
  characters: Partial<Record<string, CharacterArtifactData>>;
}
