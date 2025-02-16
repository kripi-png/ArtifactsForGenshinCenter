import { UserArtifactData } from "@/types";
import { userArtifactStore } from "@/lib/storage";
import { migrateTo_2_0_0 } from "@/lib/migration";

export default defineBackground(() => {
  userArtifactStore.subscribe(console.log);

  // take user to the uninstall survey on uninstall
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      browser.runtime.setUninstallURL("https://forms.gle/fzXzLfMit3jSLtdg8");
    }

    if (details.reason === "update") {
      const currentVersion = browser.runtime.getManifest().version;
      if (currentVersion === "2.0.0") {
        console.info(
          "Update to version 2.0 detected: migrating user artifact data",
        );

        // get the user data to be migrated. If it does not exist, there is nothing to migrate.
        browser.storage.local.get("userArtifactData").then((result) => {
          const data = result?.userArtifactData as UserArtifactData;
          console.log({ data });
          if (Object.keys(data).length === 0) {
            console.info("No data found to be migrated. Migration complete.");
          } else {
            const migratedData = migrateTo_2_0_0(data);
            browser.storage.local.set({ userArtifactStore: migratedData });
            // the old data will be kept
          }
        });
      }
    }
  });

  // take user to Genshin Center when they click the extension icon
  browser.action.onClicked.addListener((tab) => {
    browser.tabs.update({
      url: "https://genshin-center.com/planner",
    });
  });
});
