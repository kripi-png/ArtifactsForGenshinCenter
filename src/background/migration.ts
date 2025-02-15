import type {
  ArtifactData,
  ArtifactSlotType,
  CharacterArtifactData,
  UserArtifactData,
} from "../types";

// the rework of 2.0.0 introduced some changes to the data structure of userArtifactData,
// and migration is required in order to avoid data loss
export const migrateTo_2_0_0 = (data: any) => {
  console.info("Migrating...");
  console.log("data", data);

  const { __DISABLED: disabled, ...characters } = data;
  const migratedDataTemplate: UserArtifactData = {
    __DISABLED: disabled || false,
    __VERSION: 1,
    characters: {},
  };

  // loop through all characters
  for (const char of Object.keys(characters)) {
    const { disabled, ...artifacts } = characters[char];
    const characterTemplate: CharacterArtifactData = {
      disabled,
      artifacts: {},
    };

    // loop through character's artifacts and change the property names
    for (const artifactType of Object.keys(artifacts)) {
      const artifact: ArtifactData = {
        check: artifacts[artifactType].check || false,
        artifactSet: artifacts[artifactType].set || "",
        mainStat: artifacts[artifactType].main || "",
        subStats: artifacts[artifactType].sub || "",
      };

      characterTemplate.artifacts[<ArtifactSlotType>artifactType] = artifact;
    }

    const hyphenatedCharName = char.toLowerCase().replace(/\s+/g, "-");
    migratedDataTemplate.characters[hyphenatedCharName] = characterTemplate;
  }

  return migratedDataTemplate;
};
