import { artifactSlots } from "@/constants";
import type {
  ArtifactData,
  ArtifactSlotType,
  CharacterArtifactData,
  UserArtifactData,
} from "../types";

// the rework of 2.0.0 introduced some changes to the data structure of userArtifactData,
// and migration is required in order to avoid data loss
export const migrateTo_2_0_0 = (data: any) => {
  // console.log("Migrating to 2.0.0");
  const { __DISABLED: disabled, ...characters } = data;
  const migratedData: UserArtifactData = {
    __DISABLED: disabled ?? false,
    characters: {},
  };

  for (const character of Object.keys(characters)) {
    // console.log("Migrating", character);
    const { disabled, ...artifacts } = characters[character];
    const characterTemplate: CharacterArtifactData = {
      disabled: disabled ?? false,
      artifacts: {},
    };

    // go through the artifacts
    for (const type of Object.keys(artifacts) as ArtifactSlotType[]) {
      if (!artifactSlots.includes(type)) continue;

      const artifact: ArtifactData = {
        check: artifacts[type].check ?? false,
        artifactSet: artifacts[type].set ?? "",
        mainStat: artifacts[type].main ?? "",
        subStats: artifacts[type].sub ?? "",
      };

      characterTemplate.artifacts[type] = artifact;
    }

    const hyphenatedCharName = character.toLowerCase().replace(/\s+/g, "-");
    migratedData.characters[hyphenatedCharName] = characterTemplate;
  }

  return migratedData;
};
