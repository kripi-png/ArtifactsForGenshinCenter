import { get } from "svelte/store";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import {
  deleteCharacterArtifact,
  exportArtifactData,
  getArtifactBySetAndType,
  getLocalDataset,
  importArtifactData,
  saveCharacterArtifact,
} from "./dataManager";

import { ArtifactData, UserArtifactData } from "@/types";
import realDataset from "../dataset.json";
import { userArtifactStore } from "./storage";

describe("data manager", () => {
  beforeAll(async () => {
    browser.storage.local.set({ dataset: realDataset });
  });

  test("loads the dataset", async () => {
    const getterSpy = vi.spyOn(browser.storage.local, "get");
    const dataset = await getLocalDataset();

    expect(getterSpy).toBeCalledWith("dataset");
    expect(dataset).toStrictEqual(realDataset);
  });

  test("returns the correct image for artifact sets and artifacts", async () => {
    const data = await getArtifactBySetAndType(
      "Desert Pavilion Chronicle",
      "plume",
    );
    expect(data?.name).toBe("End of the Golden Realm");
    expect(data?.imageUrl).toBe("https://i.imgur.com/PSp0U1A.png");

    // incorrect name should return null
    const data2 = await getArtifactBySetAndType(
      "This Does Not Exists",
      "goblet",
    );
    expect(data2).toBeNull();
  });
});

describe("modifying user artifact store-state", () => {
  beforeEach(() => {
    userArtifactStore.set({
      __DISABLED: false,
      characters: {},
    });
  });

  test("saves and removes an artifact", () => {
    const artifact: ArtifactData = {
      check: false,
      artifactSet: "Adventurer",
      mainStat: "HP",
      subStats: "crit%",
    };

    saveCharacterArtifact("albedo", "plume", artifact);
    expect(get(userArtifactStore).characters).toHaveProperty(
      "albedo.artifacts.plume.artifactSet",
      "Adventurer",
    );

    deleteCharacterArtifact("albedo", "plume");
    expect(get(userArtifactStore).characters).not.toHaveProperty(
      "albedo.artifacts.plume",
    );
  });

  test("doesn't crash removing non-existing character or artifact", () => {
    // ensure the state is clean
    expect(get(userArtifactStore).characters).not.toHaveProperty("hu-tao");
    // attempt removing Hu Tao's artifact which does not exist
    deleteCharacterArtifact("hu-tao", "circlet");
    // nothing should have changed
    expect(get(userArtifactStore).characters).not.toHaveProperty("hu-tao");
  });

  test("also modifies browser.storage", () => {
    const artifact: ArtifactData = {
      check: true,
      artifactSet: "Gladiator",
      mainStat: "Geo DEF",
      subStats: "Ele Mastery",
    };

    saveCharacterArtifact("traveler", "plume", artifact);
    deleteCharacterArtifact("traveler", "plume");
    expect(storage.getItem("local:userArtifactData")).not.toHaveProperty(
      "characters.traveler.plume",
    );
  });

  test("removes character if it has no artifacts", () => {
    const artifact: ArtifactData = {
      check: true,
      artifactSet: "Nymph's Dream",
      mainStat: "Geo DEF",
      subStats: "Ele Mastery",
    };

    saveCharacterArtifact("raiden-shogun", "goblet", artifact);
    deleteCharacterArtifact("raiden-shogun", "goblet");
    expect(get(userArtifactStore).characters).not.toHaveProperty(
      "raiden-shogun",
    );
  });
});

describe("importing and exporting", () => {
  beforeEach(() => {
    userArtifactStore.set({
      __DISABLED: false,
      characters: {},
    });
  });

  test("imports stringified data", () => {
    const stringified =
      '{"__DISABLED":true,"characters":{"collei":{"artifacts":{"plume":{"artifactSet":"Echoes of an Offering","check":true,"mainStat":"","subStats":""}},"disabled":false}}}';

    importArtifactData(stringified);

    expect(get(userArtifactStore)).toHaveProperty(
      "characters.collei.artifacts.plume.check",
      true,
    );
  });

  test("imports object data", () => {
    // prettier-ignore
    const dataObj: UserArtifactData = {"__DISABLED":true,"characters":{"collei":{"artifacts":{"plume":{"artifactSet":"Echoes of an Offering","check":true,"mainStat":"","subStats":""}},"disabled":false}}}

    importArtifactData(dataObj);

    expect(get(userArtifactStore)).toHaveProperty(
      "characters.collei.artifacts.plume.check",
      true,
    );
  });

  test.each([{}, { __DISABLED: false }, { characters: {} }])(
    "imports partial data",
    async (data) => {
      importArtifactData(data);
      expect(await storage.getItem("local:userArtifactData")).toStrictEqual({
        __DISABLED: false,
        characters: {},
      });
    },
  );

  test("exports character data", () => {
    const artifact: ArtifactData = {
      check: true,
      artifactSet: "Nymph's Dream",
      mainStat: "Geo DEF",
      subStats: "Ele Mastery",
    };
    saveCharacterArtifact("raiden-shogun", "goblet", artifact);

    const exportedData = exportArtifactData();
    expect(exportedData).toBeTypeOf("string");
    expect(JSON.parse(exportedData)).toHaveProperty(
      "characters.raiden-shogun.artifacts.goblet.mainStat",
      "Geo DEF",
    );
  });
});
