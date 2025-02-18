import { get } from "svelte/store";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import {
  deleteCharacterArtifact,
  getArtifactBySetAndType,
  getLocalDataset,
  saveCharacterArtifact,
} from "./dataManager";

import { ArtifactData } from "@/types";
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
    let artifactSetData = {
      "Desert Pavilion Chronicle": [
        ["The First Days of the City of Kings", "xtGI1Ph"],
        ["End of the Golden Realm", "PSp0U1A"],
        ["Timepiece of the Lost Path", "P6adtvk"],
        ["Defender of the Enchanting Dream", "XRtmz2j"],
        ["Legacy of the Desert High-Born", "9pm6EUj"],
      ],
    };

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
      __DISABLED: true,
      __VERSION: 1,
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

  test("also modifies chrome.storage", () => {
    const artifact: ArtifactData = {
      check: true,
      artifactSet: "Gladiator",
      mainStat: "Geo DEF",
      subStats: "Ele Mastery",
    };
    const setSpy = vi.spyOn(chrome.storage.local, "set");

    saveCharacterArtifact("traveler", "plume", artifact);
    expect(setSpy).toHaveBeenCalledWith(
      expect.objectContaining({ userArtifactStore: expect.anything() }),
    );

    deleteCharacterArtifact("traveler", "plume");
    expect(setSpy).toHaveBeenCalledTimes(2);
  });

  test("removes character if it has no artifacts", () => {
    const artifact: ArtifactData = {
      check: true,
      artifactSet: "Nymph's Dream",
      mainStat: "Geo DEF",
      subStats: "Ele Mastery",
    };
    const setSpy = vi.spyOn(chrome.storage.local, "set");

    saveCharacterArtifact("raiden-shogun", "goblet", artifact);
    deleteCharacterArtifact("raiden-shogun", "goblet");
    expect(get(userArtifactStore).characters).not.toHaveProperty(
      "raiden-shogun",
    );
    expect(setSpy).toHaveBeenCalledTimes(2);
  });
});
