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
  flower?: ArtifactData;
  plume?: ArtifactData;
  sands?: ArtifactData;
  goblet?: ArtifactData;
  circlet?: ArtifactData;
}

export interface UserArtifactData {
  __DISABLED: boolean;
  [key: string]: boolean | CharacterArtifactData;
}
