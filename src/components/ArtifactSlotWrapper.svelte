<script lang="ts">
    import ArtifactSlot from "./ArtifactSlot.svelte";
    import { userArtifactStore } from "../lib/storage";
    import { artifactSlots } from "@/constants";

    interface Props {
        characterName: string;
    }
    let { characterName }: Props = $props();

    // derive the artifact data from the whole data, and ensure it is not undefined
    let characterArtifacts = $derived(
        $userArtifactStore.characters[characterName]?.artifacts || {},
    );
</script>

<div data-character={characterName}>
    {#each artifactSlots as slotType}
        {@const artifact = characterArtifacts[slotType]}
        <ArtifactSlot {slotType} {characterName} {artifact} />
    {/each}
</div>

<style>
    div {
        display: flex;
    }
</style>
