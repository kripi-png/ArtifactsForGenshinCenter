<script lang="ts">
    import { type ArtifactSlotType } from "@/types";
    import { type ModalProps } from "svelte-modals";
    import ArtifactInput from "./ArtifactInput.svelte";
    interface Props extends ModalProps {
        character: string;
        type: ArtifactSlotType;
    }
    const { isOpen, close, character, type }: Props = $props();
    console.log(character, type);
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="content">
            <div class="topBar">
                <h3>Edit Artifact</h3>
                <h4>
                    {character.replace("-", " ")}'s {type}
                </h4>
            </div>
            <div
                class="Schedule_taskCreatorContent__3tCoD"
                style="padding: 0 10px 15px"
            >
                <ArtifactInput
                    sectionName={"Set Name"}
                    placeholder={"Enter set name..."}
                    type="artifactList"
                />
                <ArtifactInput
                    sectionName={"Main Stat"}
                    placeholder={"Enter main stat..."}
                />
                <ArtifactInput
                    sectionName={"Sub Stat"}
                    placeholder={"Enter sub stat(s)..."}
                />
                <ArtifactInput
                    sectionName={"Already obtained"}
                    type="checkbox"
                />
                <div
                    class="Ascension_missing__FaHoD"
                    style="font-size: 16px; color: #f54c4c; margin-bottom: 30px;"
                >
                    <p>
                        Artifact data will be wiped when extension is
                        uninstalled.
                    </p>
                    <p>Exporting and importing can be done in Options menu.</p>
                </div>
                <div class="Schedule_buttonsWrapper__fdOV_">
                    <button id="editorBtnDelete">Delete</button>
                    <button id="editorBtnConfirm">OK</button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        z-index: 10000;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .content {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        display: grid;
        max-height: 95%;
        max-width: 96vw;
        background-color: #1e2231;
        border-radius: 5px;
        overflow: hidden;
        grid-template-rows: auto 1fr auto;
        opacity: 1;
        pointer-events: all;
    }

    .topBar {
        /* Schedule_taskTopBar__lV1W8 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        flex-direction: column;
    }

    .topBar > h3 {
        font-size: 26px;
        line-height: 54px;
        font-weight: 800;
        flex-grow: 1;
        text-align: center;
    }

    .topBar > h4 {
        padding-bottom: 10px;
        text-transform: capitalize;
    }
</style>
