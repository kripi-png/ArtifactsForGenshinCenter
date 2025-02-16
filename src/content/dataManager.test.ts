import { test, expect, vi } from "vitest";
import { getArtifactBySetAndType, getLocalDataset } from "./dataManager";

import realDataset from "../dataset.json";

test("loads the dataset", async () => {
  const getterSpy = vi.spyOn(chrome.storage.local, "get");
  const dataset = await getLocalDataset();

  expect(getterSpy).toBeCalledWith(["dataset"], expect.any(Function));
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
  const data2 = await getArtifactBySetAndType("This Does Not Exists", "goblet");
  expect(data2).toBeNull();
});
