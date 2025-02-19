<script lang="ts">
    import type { CharacterArtifactData } from "@/types";
    import { artifactSlots } from "@/constants";
    import ArtifactSlot from "./ArtifactSlot.svelte";
    import { userArtifactStore } from "../lib/storage";

    interface Props {
        characterName: string;
    }
    let { characterName }: Props = $props();

    // derive the artifact data from the whole data, and ensure it is not undefined
    let characterData: CharacterArtifactData = $derived(
        $userArtifactStore.characters[characterName] || {
            disabled: false,
            artifacts: {},
        },
    );
</script>

<div
    class="artifactSlotWrapper"
    class:disabled={characterData.disabled}
    data-character={characterName}
>
    {#each artifactSlots as slotType}
        {@const artifact = characterData.artifacts[slotType]}
        <ArtifactSlot {slotType} {characterName} {artifact} />
    {/each}
</div>

<style>
    div {
        display: flex;
    }

    div.disabled {
        display: none;
    }
</style>
