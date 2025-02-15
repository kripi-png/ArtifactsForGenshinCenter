import { userArtifactStore } from "../storage";
userArtifactStore.subscribe(console.log);

// take user to the uninstall survey on uninstall
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL("https://forms.gle/fzXzLfMit3jSLtdg8");
  }
});

// take user to Genshin Center when they click the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.update({
    url: "https://genshin-center.com/planner",
  });
});
