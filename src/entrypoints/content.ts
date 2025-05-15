import {
  generateArtifactDatalist,
  generateCharacterObserver,
  isPanelWeapon,
  mountSlots,
} from "@/lib/artifactManager";
import { mount } from "svelte";
import ExtensionSettings from "../components/ExtensionSettings.svelte";
import SidepanelOptions from "../components/SidepanelOptions.svelte";
import Modals from "../components/modals/Modals.svelte";
import "../index.css";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  async main(ctx) {
    // mount the Modal base
    mount(Modals, { target: document.body });

    // on initial load, find all character panels and add the UI
    // later changes are managed by a mutation observer
    createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".Farm_itemList__EgRFB",
      onMount: (container) => {
        // find all panels https://stackoverflow.com/a/842346
        const panels = [];
        let n = container.parentNode!.firstChild as HTMLElement;
        for (; n; n = n.nextSibling as HTMLElement) {
          // nodeType 1 is ELEMENT_NODE (2 = ATTRIBUTE_NODE etc.)
          if (n.nodeType == 1 && n != container && !isPanelWeapon(n))
            panels.push(n);
        }
        panels.forEach((panel) => mountSlots(ctx, panel));
        // remove the helper UI / self
        container.remove();
      },
    }).autoMount();

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
