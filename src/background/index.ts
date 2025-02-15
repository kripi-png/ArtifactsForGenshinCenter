import { userArtifactStore } from "../storage";
import { migrateTo_2_0_0 } from "./migration";
userArtifactStore.subscribe(console.log);

// take user to the uninstall survey on uninstall
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL("https://forms.gle/fzXzLfMit3jSLtdg8");
  }

  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    const currentVersion = chrome.runtime.getManifest().version;
    if (currentVersion === "2.0.0") {
      console.info(
        "Update to version 2.0 detected: migrating user artifact data",
      );

      // get the user data to be migrated. If it does not exist, there is nothing to migrate.
      chrome.storage.local.get("userArtifactData").then((data) => {
        data = data?.userArtifactData;
        console.log({ data });
        if (Object.keys(data).length === 0) {
          console.info("No data found to be migrated. Migration complete.");
        } else {
          const migratedData = migrateTo_2_0_0(data);
          chrome.storage.local.set({ userArtifactStore: migratedData });
          // the old data will be kept
        }
      });
    }
  }
});

// take user to Genshin Center when they click the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.update({
    url: "https://genshin-center.com/planner",
  });
});
