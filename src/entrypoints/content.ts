import {
  generateArtifactDatalist,
  generateCharacterObserver,
} from "@/lib/artifactManager";
import { mount } from "svelte";
import ExtensionSettings from "../components/ExtensionSettings.svelte";
import ModalBackdrop from "../components/modals/ModalsBackdrop.svelte";
import SidepanelOptions from "../components/SidepanelOptions.svelte";
import "../index.css";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  async main(ctx) {
    // important: backdrop for modals, e.g. the Editor
    mount(ModalBackdrop, {
      target: document.body,
    });

    // listen and look for character panels
    const observer = generateCharacterObserver(ctx);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
    ctx.onInvalidated(() => {
      observer.disconnect();
    });

    // SETTINGS WINDOW INJECTION
    createIntegratedUi(ctx, {
      position: "inline",
      anchor: "#options .PlannerOptions_content__kBajJ",
      onMount: (container) => {
        mount(ExtensionSettings, {
          target: container,
        });
      },
    }).autoMount();

    // SIDE PANEL OPTIONS LIST INJECTION
    createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".PlannerOptions_optionContent__2_jPR",
      append: (anchor, ui) => {
        anchor.insertBefore(ui, anchor.lastElementChild);
        (ui as HTMLElement).style.width = "100%";
      },
      onMount: (container) => {
        mount(SidepanelOptions, {
          target: container,
        });

        if (import.meta.env.DEV) {
          // _dev_OpenSettingsPanel();
        }
      },
    }).autoMount();

    generateArtifactDatalist();
  },
});

const _dev_OpenSettingsPanel = () => {
  const openSettings: HTMLElement = document.querySelector(
    "div.Farm_farm__uhRH4 > div.Farm_divider__XPwtq div.PlannerOptions_options__t3nvI div > h4",
  ) as HTMLElement;
  openSettings?.click();
};
