<script lang="ts">
    import type { ModalProps } from "@/lib//modals/Modal.svelte";
    import type { ArtifactData, ArtifactSlotType } from "@/types";
    import { userArtifactStore } from "@/lib/storage";
    import {
        saveCharacterArtifact,
        deleteCharacterArtifact,
    } from "@/lib/dataManager";
    import EditorInput from "./EditorInput.svelte";
    import ModalBase from "./ModalBase.svelte";

    interface Props extends ModalProps {
        character: string;
        type: ArtifactSlotType;
    }
    let { isOpen, close, character, type }: Props = $props();

    const getMainStatDefaultValue = (type: ArtifactSlotType): string => {
        /* flower/plume always has HP/ATK as the main stat. */
        if (type === "flower") {
            return "HP";
        }
        if (type === "plume") {
            return "ATK";
        }
        return "";
    };

    let initialState: ArtifactData = {
        check: false,
        artifactSet: "",
        mainStat: getMainStatDefaultValue(type),
        subStats: "",
    };
    // if character has data for the artifact, use it. Otherwise use the initial empty state
    const characterArtifact =
        $userArtifactStore.characters[character]?.artifacts[type];
    let artifact = $state<ArtifactData>(
        characterArtifact ? characterArtifact : initialState,
    );

    const confirmArtifact = () => {
        if (!artifact.artifactSet) return;

        const artifactSnapshot: ArtifactData = $state.snapshot(artifact);
        saveCharacterArtifact(character, type, artifactSnapshot);
        close();
    };

    const deleteArtifact = () => {
        deleteCharacterArtifact(character, type);
        close();
    };
</script>

<ModalBase {isOpen} bind:bindFix={artifact}>
    <div class="modalHeader">
        <h3>Edit Artifact</h3>
        <h4>{character.replace("-", " ")}'s {type}</h4>
    </div>
    <div class="modalContent">
        <EditorInput
            sectionName={"Set Name"}
            placeholder={"Enter set name..."}
            listAttribute="artifactSelectorDatalist"
            name="artifactSet"
            bind:artifact
        />
        <!-- disable dropdown for flower and plume -->
        <EditorInput
            sectionName={"Main Stat"}
            placeholder={"Enter main stat..."}
            name="mainStat"
            bind:artifact
            listAttribute={type === "flower" || type === "plume"
                ? ""
                : "mainStatOptions"}
        />
        <EditorInput
            sectionName={"Sub Stat"}
            placeholder={"Enter sub stat(s)..."}
            name="subStats"
            bind:artifact
        />
        <EditorInput
            sectionName={"Already obtained"}
            type="checkbox"
            name="check"
            bind:artifact
        />
        <div class="warning" style="">
            <p>Artifact data will be wiped when extension is uninstalled.</p>
            <p>Exporting and importing can be done in Options menu.</p>
        </div>
        <!-- TODO: change to cross / checkmark buttons like in other places on the web page -->
        <div class="buttonWrapper">
            <button onclick={deleteArtifact}>Delete</button>
            <button onclick={confirmArtifact}>OK</button>
        </div>
    </div>
</ModalBase>

<style>
    .modalHeader {
        /* Schedule_taskTopBar__lV1W8 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        flex-direction: column;
    }

    .modalHeader > h3 {
        font-size: 26px;
        line-height: 54px;
        font-weight: 800;
        flex-grow: 1;
        text-align: center;
    }

    .modalHeader > h4 {
        padding-bottom: 10px;
        text-transform: capitalize;
    }

    .modalContent {
        /* Schedule_taskCreatorContent__3tCoD */
        background-color: #1e2231;
        box-shadow: inset 0 89px 11px -90px rgba(0, 0, 0, 0.75);
        width: 340px;
        overflow: auto;
        padding: 0 10px 15px;
    }

    .warning {
        padding-bottom: 5px;
        text-align: center;
        font-size: 16px;
        color: #f54c4c;
        margin-bottom: 30px;
    }

    .buttonWrapper {
        /* Schedule_buttonsWrapper__fdOV_ */
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    .buttonWrapper button {
        padding: 10px 40px;
        border: #ece5d8 solid 1.5px;
        border-radius: 20px;
        transition: 0.2s;
    }

    .buttonWrapper button:hover {
        border: #1e2231 solid 1.5px;
        background: #ece5d8;
        color: #1e2231;
        cursor: pointer;
        font-weight: 700;
        transition: 0.2s;
    }

    .buttonWrapper button:focus {
        filter: brightness(70%);
        transition: 0.2s;
    }
</style>
