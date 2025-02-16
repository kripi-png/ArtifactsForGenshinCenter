export let DATASET, ARTIFACT_SET_NAMES, ARTIFACT_DATA;

const loadDataset = async () => {
  const data = await fetch(chrome.runtime.getURL('src/dataset.json'));
  return data.json();
};

export const saveToLocalStorage = (name, data) => {
  chrome.storage.local.set({ [name]: JSON.stringify(data) });
};

const loadFromStorage = async name => {
  // chrome.storage.local.get cannot return anything unless
  // it is wrapped inside a promise
  return new Promise( resolve => {
    chrome.storage.local.get([name], result => {
      // if user uses the extension for the first time
      // key doesn't exist and the extension would crash
      if (!result[name]) {
        resolve(false);
        return;
      }

      resolve(JSON.parse(result[name]));
    });
  });
};

export const loadArtifactData = async () => {
  DATASET = await loadDataset();
  ARTIFACT_SET_NAMES = Object.keys(DATASET);
  ARTIFACT_DATA = await loadFromStorage('userArtifactData') || {};

  // define __DISABLED attribute if not done previously
  // used to disable/enable ALL artifacts, toggled via checkbox in options menu
  if ( !ARTIFACT_DATA['__DISABLED'] ) {
    ARTIFACT_DATA['__DISABLED'] = false;
  }
};
