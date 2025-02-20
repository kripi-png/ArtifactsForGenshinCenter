import type {
  ArtifactData,
  ArtifactSlotType,
  DatasetData,
  UserArtifactData,
} from "../types";
import { artifactSlots } from "@/constants";
import { userArtifactStore } from "./storage";
import { get } from "svelte/store";

export const updateLocalDataset = async () => {
  /*
  Make a HEAD request to the raw dataset json stored on Github.
  The Content-Length header is used to check whether the dataset
  has been changed since last time, and if so, the local dataset in the
  localStorage is updated.
  */
  const requestUrl =
    "https://raw.githubusercontent.com/kripi-png/ArtifactsForGenshinCenter/main/src/dataset.json";

  try {
    const headResponse = await fetch(requestUrl, { method: "HEAD" });
    const newSize = Number(headResponse.headers.get("Content-Length"));
    const oldSize = await _getLocalDatasetVersion();
    console.log("newSize", newSize, typeof newSize);
    console.log("oldSize", oldSize, typeof oldSize);

    // check whether the localDataset exists, just in case
    // it is possible for the version entry to exist without the dataset
    const localDataset = await getLocalDataset();
    const localDatasetExists = Object.keys(localDataset).length !== 0;
    console.log("localDatasetExists", localDatasetExists);
    // if everything is in order, return.
    if (newSize === oldSize && localDatasetExists) return;

    // if the dataset has changed, fetch the new json
    // and save it to localStorage along with the new version
    const response = await fetch(requestUrl);
    const resJson = (await response.json()) as DatasetData;
    setLocalStorage("dataset", resJson);
    setLocalStorage("datasetVersion", newSize);
  } catch (error) {
    console.error(error);
  }
};

const _getLocalDatasetVersion = async (): Promise<number> => {
  // helper method for updateLocalDataset

  return new Promise((resolve) => {
    browser.storage.local.get("datasetVersion").then((result) => {
      if (!result?.datasetVersion) resolve(0);
      resolve(Number(result.datasetVersion));
    });
  });
};

export const getLocalDataset = async (): Promise<DatasetData> => {
  // get the dataset from the localStorage

  return new Promise((resolve) => {
    browser.storage.local
      .get("dataset")
      .then((result: { dataset?: DatasetData }) => {
        return resolve(result?.dataset || {});
      });
  });
};

export const getAllArtifactSets = async () => {
  const data = await getLocalDataset();
  return Object.keys(data);
};

interface ArtifactNameAndImage {
  name: string;
  imageUrl: string;
}
/**
 * Gets the name and image of an artifact by its set name and type.
 * @param {string} setName The name of the artifact set.
 * @param {ArtifactSlotType} type The type of the artifact.
 * @returns {Promise<ArtifactNameAndImage | null>} The artifact data.
 */
export const getArtifactBySetAndType = async (
  setName: string,
  type: ArtifactSlotType,
): Promise<ArtifactNameAndImage | null> => {
  return new Promise(async (resolve) => {
    const dataset = await getLocalDataset();
    if (!dataset || !dataset.hasOwnProperty(setName)) {
      return resolve(null);
    }
    // flower = 0, circlet = 4
    const typeIndex: number = artifactSlots.indexOf(type);
    const [name, imageId] = dataset[setName][typeIndex];
    resolve({ name, imageUrl: `https://i.imgur.com/${imageId}.png` });
  });
};

export const setLocalStorage = (key: string, value: any) => {
  // general setter method
  browser.storage.local.set({ [key]: value });
};

/**
 * Saves the character's artifact data to the Svelte store-state, which is synced with chrome.storage.local.
 * @param {string} characterName - Character whose artifact is being saved.
 * @param {ArtifactSlotType} artifactType - Type of the artifact.
 * @param {ArtifactData} artifactData - Data of the artifact.
 */
export const saveCharacterArtifact = (
  characterName: string,
  artifactType: ArtifactSlotType,
  artifactData: ArtifactData,
): void => {
  userArtifactStore.update((state) => {
    // if character does not have previous data in the store,
    // initiate the base data along with the artifact
    if (!state.characters[characterName]) {
      state.characters[characterName] = {
        disabled: false,
        artifacts: {
          [artifactType]: artifactData,
        },
      };
      return state;
    }

    // ensure the character has an artifacts object
    if (!state.characters[characterName].artifacts) {
      state.characters[characterName].artifacts = {};
    }

    // if all else is fine, update the artifact data
    state.characters[characterName].artifacts[artifactType] = artifactData;
    return state;
  });
};

/**
 * Delete the character's artifact by type from the Svelte store-state.
 * @param {string} characterName
 * @param {ArtifactSlotType} artifactType
 */
export const deleteCharacterArtifact = (
  characterName: string,
  artifactType: ArtifactSlotType,
) => {
  userArtifactStore.update((state) => {
    // if character does not exist
    if (!state.characters[characterName]) return state;
    // if character has no artifact of type
    if (!state.characters[characterName].artifacts[artifactType]) return state;

    // remove the artifact by type
    delete state.characters[characterName].artifacts[artifactType];
    // if the character has no more artifacts AND the character is NOT disabled
    if (
      _isEmptyObject(state.characters[characterName].artifacts) &&
      !state.characters[characterName].disabled
    )
      delete state.characters[characterName];

    return state;
  });
};

/**
 * Import artifact data into the store and local storage.
 * @param {Record<string, any> | string} data Object or stringified JSON data to be imported
 */
export const importArtifactData = (
  data: string | Record<string, any>,
): void => {
  // TODO: really need some runtime data validation, maybe with Zod?
  const parsedData: UserArtifactData =
    typeof data === "string" ? JSON.parse(data) : data;
  if (!parsedData.characters) parsedData.characters = {};
  if (!parsedData.__VERSION) parsedData.__VERSION = 1;
  if (!parsedData.__DISABLED) parsedData.__DISABLED = false;

  userArtifactStore.set(parsedData);
};

/**
 * Stringify user's artifact data.
 * @returns {string} JSON stringified artifact data
 */
export const exportArtifactData = (): string => {
  return JSON.stringify(get(userArtifactStore));
};

/**
 * Test whether an object or array is empty.
 * Faster than `Object.keys(obj).length === 0`,
 * although it is debatable whether it matters in this case.
 * @param obj Object for testing
 * @returns {boolean} true if the object is empty, false otherwise
 */
const _isEmptyObject = (obj: Record<any, any> | any[]): boolean => {
  // check for invalid values on runtime
  if (obj === null || obj === undefined || typeof obj !== "object")
    return false;

  for (var i in obj) return false;
  return true;
};

// test local helper functions so they don't have to be exported
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test("isEmptyObject", () => {
    // object
    expect(_isEmptyObject({})).toBe(true);
    expect(_isEmptyObject({ a: 1, b: 2 })).toBe(false);
    // array
    expect(_isEmptyObject([] as any)).toBe(true);
    expect(_isEmptyObject([1, 2, 3] as any)).toBe(false);

    expect(_isEmptyObject(null as any)).toBe(false);
    expect(_isEmptyObject("string" as any)).toBe(false);
    expect(_isEmptyObject("" as any)).toBe(false);
    expect(_isEmptyObject(123 as any)).toBe(false);
  });
}
