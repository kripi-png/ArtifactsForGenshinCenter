<script lang="ts">
    import { type ArtifactSlotType } from "@/types";
    import { type ModalProps } from "svelte-modals";
    interface Props extends ModalProps {
        character: string;
        type: ArtifactSlotType;
    }
    const { isOpen, close, character, type }: Props = $props();
    console.log(character, type);
</script>

{#if isOpen}
    <div
        style="width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;"
    >
        <div class="Window_window__0zdsm" style="opacity: 1;">
            <div
                class="Window_modal__2s0yi"
                style="opacity: 1; pointer-events: all;"
            >
                <div class="Schedule_taskCreator__bA_eq">
                    <div
                        class="Schedule_taskTopBar__lV1W8"
                        style="flex-direction: column;"
                    >
                        <h3>Edit Artifact</h3>
                        <h4
                            style="padding-bottom: 10px; text-transform: capitalize;"
                        >
                            ${character}'s ${type}
                        </h4>
                    </div>
                    <div
                        class="Schedule_taskCreatorContent__3tCoD"
                        style="padding: 0 10px 15px"
                    >
                        <!-- ${Section(
                        ARTIFACT_SET_NAMES,
                        "selectArtifactInput",
                        "Set Name",
                        "Enter set name...",
                    ).outerHTML}
                    ${Section(
                        null,
                        "artifactMainStat",
                        "Main Stat",
                        "Enter main stat...",
                    ).outerHTML}
                    ${Section(
                        null,
                        "artifactSubStat",
                        "Sub Stat",
                        "Enter sub stat(s)...",
                    ).outerHTML}
                    ${Section(
                        null,
                        "artifactCheckbox",
                        "Already obtained",
                        null,
                    ).outerHTML} -->
                        <div
                            class="Ascension_missing__FaHoD"
                            style="font-size: 16px; color: #f54c4c; margin-bottom: 30px;"
                        >
                            <p>
                                Artifact data will be wiped when extension is
                                uninstalled.
                            </p>
                            <p>
                                Exporting and importing can be done in Options
                                menu.
                            </p>
                        </div>
                        <div class="Schedule_buttonsWrapper__fdOV_">
                            <button id="editorBtnDelete">Delete</button>
                            <button id="editorBtnConfirm">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div role="dialog" class="modal">
        <div class="contents">
            <h2>{character}'s {type}</h2>
            <p>lorem ipsum dolo res</p>
            <div class="actions">
                <button onclick={() => close()}>OK</button>
            </div>
        </div>
    </div> -->
{/if}

<style>
    .modal {
        /* position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        /*pointer-events: none;

        z-index: 2; */
    }

    .contents {
        min-width: 240px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        font-size: 24px;
    }

    p {
        text-align: center;
        margin-top: 16px;
        border-radius: 6px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: flex-end;
    }
</style>
