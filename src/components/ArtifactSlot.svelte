<script lang="ts">
    import type { ArtifactData, ArtifactSlotType } from "@/types";
    import { modals } from "svelte-modals";
    import EditorModal from "./editor/EditorModal.svelte";
    import { getArtifactBySetAndType } from "../lib/dataManager";

    interface Props {
        characterName: string;
        slotType: ArtifactSlotType;
        artifact: ArtifactData | undefined;
    }
    let { characterName, slotType, artifact }: Props = $props();

    // update the artifact image when the artifact data state changes
    let artifactImageUrl = $state("");
    $effect(() => {
        if (!artifact) {
            artifactImageUrl = "";
            return;
        }

        getArtifactBySetAndType(artifact.artifactSet, slotType).then((data) => {
            artifactImageUrl = data?.imageUrl ?? "";
        });
    });

    const openEditor = () => {
        modals.open(EditorModal, { character: characterName, type: slotType });
    };
</script>

<button
    style={artifactImageUrl
        ? `background-image: url(${artifactImageUrl});`
        : ""}
    class={`${slotType}Slot`}
    class:check={artifact?.check}
    onclick={openEditor}
    aria-label={`${slotType} for ${characterName}`}
></button>

<style>
    button {
        flex: 1;
        /* width: 60px; */
        height: 72px;
        background-size: cover;
        background-size: 72px 72px;
        background-repeat: no-repeat;
    }

    button:hover {
        cursor: pointer;
    }

    .flowerSlot {
        background-image: url("https://i.imgur.com/GqSEgvB.png");
    }
    .plumeSlot {
        background-image: url("https://i.imgur.com/FpKdZFQ.png");
    }
    .gobletSlot {
        background-image: url("https://i.imgur.com/0XhOfPS.png");
    }
    .sandsSlot {
        background-image: url("https://i.imgur.com/C1kloPS.png");
    }
    .circletSlot {
        background-image: url("https://i.imgur.com/AO6dMV6.png");
    }

    .check {
        position: relative;
    }

    .check::after {
        content: "";
        background-image: url("https://i.imgur.com/x60nTNg.png");
        background-repeat: no-repeat;
        position: absolute;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
