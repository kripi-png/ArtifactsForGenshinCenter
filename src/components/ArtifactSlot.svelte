<script lang="ts">
    import type { ArtifactSlotType } from "@/types";
    interface Props {
        charName: string;
        slotType: ArtifactSlotType;
        artifactSet: string | undefined;
    }

    import { getArtifactBySetAndType } from "../lib/dataManager";

    const { charName, slotType, artifactSet }: Props = $props();
    // update the artifact image when the artifact data state changes
    let artifactImageUrl = $state("");
    $effect(() => {
        if (!artifactSet) {
            artifactImageUrl = "";
            return;
        }

        getArtifactBySetAndType(artifactSet, slotType).then((data) => {
            artifactImageUrl = data?.imageUrl ?? "";
        });
    });

    // TODO: open the editor modal when artifact is clicked
    const onClick = () => {
        console.log(`${charName} ${slotType} ${artifactSet}`);
    };
</script>

<button
    style={artifactImageUrl
        ? `background-image: url(${artifactImageUrl});`
        : ""}
    class={`${slotType}Slot`}
    onclick={onClick}
    aria-label={`${slotType} for ${charName}`}
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
</style>
