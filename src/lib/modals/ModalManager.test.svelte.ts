import { describe, expect, test } from "vitest";
import ExportModal from "@/components/modals/ExportModal.svelte";
import { ModalManager } from "./ModalManager.svelte";

describe("data manager", () => {
  test("opens and closes modals", async () => {
    const modals = new ModalManager();
    modals.open(ExportModal);
    modals.open(ExportModal);
    expect(modals.stack.length).toBe(2);
    modals.close();
    expect(modals.stack.length).toBe(1);
  });
});
