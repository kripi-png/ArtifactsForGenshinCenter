<script lang="ts">
    import type {
        ArtifactData,
        ArtifactPieceData,
        ArtifactSlotType,
    } from "@/types";
    import { modals } from "svelte-modals";
    import EditorModal from "./modals/EditorModal.svelte";
    import ArtifactPopup, {
        calculatePopupLocation,
    } from "./ArtifactPopup.svelte";
    import { getArtifactBySetAndType } from "../lib/dataManager";
    import { mount, unmount } from "svelte";

    interface Props {
        characterName: string;
        slotType: ArtifactSlotType;
        artifact: ArtifactData | undefined;
    }
    let { characterName, slotType, artifact }: Props = $props();

    // update the artifact name and image when the artifact data state changes
    let artifactPieceData: ArtifactPieceData | null = $state(null);
    $effect(() => {
        if (!artifact) {
            artifactPieceData = null;
            return;
        }

        getArtifactBySetAndType(artifact.artifactSet, slotType).then((data) => {
            artifactPieceData = data;
        });
    });

    const openEditor = () => {
        modals.open(EditorModal, { character: characterName, type: slotType });
    };

    let slotBind: null | HTMLElement = null;
    let mountedPopup: ReturnType<typeof mount> | null = null;
    const handleMouseEnter = () => {
        if (!artifact || !slotBind || !artifactPieceData) return;

        const { x: locX, y: locY } = calculatePopupLocation(slotBind);
        mountedPopup = mount(ArtifactPopup, {
            target: document.body,
            props: {
                artifact,
                name: artifactPieceData.name,
                imageUrl: artifactPieceData.imageUrl,
                locX,
                locY,
            },
        });
    };
    let handleMouseLeave = () => {
        // destroy the popup component when mouse leaves the slot
        // { outro: true } plays the transition before completely destroying the component
        if (mountedPopup) unmount(mountedPopup, { outro: true });
        mountedPopup = null;
    };
</script>

<button
    bind:this={slotBind}
    style={artifactPieceData
        ? `background-image: url(${artifactPieceData.imageUrl});`
        : ""}
    class={`${slotType}Slot`}
    class:check={artifact?.check}
    onclick={openEditor}
    aria-label={`${slotType} for ${characterName}`}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
></button>

<style>
    button {
        flex: 1;
        width: 60px;
        height: 72px;
        background-size: cover;
        background-size: 72px 72px;
        background-repeat: no-repeat;
        background-position: center;
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
