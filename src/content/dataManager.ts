import type { DatasetData } from "../types";

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
    chrome.storage.local.get(["datasetVersion"], (result) => {
      if (!result?.datasetVersion) resolve(0);
      resolve(Number(result.datasetVersion));
    });
  });
};

export const getLocalDataset = async (): Promise<DatasetData> => {
  // get the dataset from the localStorage

  return new Promise((resolve) => {
    chrome.storage.local.get(["dataset"], (result) => {
      if (!result?.dataset) {
        return resolve({});
      }
      resolve(result.dataset);
    });
  });
};

export const setLocalStorage = (key: string, value: any) => {
  // general setter method
  chrome.storage.local.set({ [key]: JSON.stringify(value) });
};
