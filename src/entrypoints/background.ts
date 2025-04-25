import { updateLocalDataset } from "@/lib/dataManager";

export default defineBackground(() => {
  // take user to the uninstall survey on uninstall
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      browser.runtime.setUninstallURL("https://forms.gle/fzXzLfMit3jSLtdg8");
    }
  });

  // take user to Genshin Center when they click the extension icon
  (browser.action ?? browser.browserAction).onClicked.addListener((tab) => {
    browser.tabs.update({
      url: "https://genshin-center.com/planner",
    });
    // also update the dataset
    updateLocalDataset();
  });

  updateLocalDataset();
});
