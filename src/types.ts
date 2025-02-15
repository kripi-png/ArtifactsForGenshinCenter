export enum ArtifactSlot {
  flower = 0,
  plume = 1,
  sands = 2,
  goblet = 3,
  circlet = 4,
}
export type ArtifactSlotType = keyof typeof ArtifactSlot;

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
