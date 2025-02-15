<script lang="ts">
    import {
        ArtifactSlot,
        type CharacterArtifactData,
        type ArtifactSlotType,
    } from "../types";
    interface Props {
        charName: string;
    }

    import ArtifactSlotElement from "./ArtifactSlot.svelte";
    import { userArtifactStore } from "../storage";

    let { charName }: Props = $props();

    // derive the artifact data from the whole data, and ensure it is not undefined
    let characterArtifacts = $derived(
        ($userArtifactStore.characters[charName] &&
            $userArtifactStore.characters[charName].artifacts) ||
            {},
    );
    $effect(() => {
        console.log(charName, characterArtifacts);
    });
</script>

<div data-character={charName}>
    {#each Object.keys(ArtifactSlot).filter( (key) => isNaN(Number(key)), ) as ArtifactSlotType[] as slotType}
        {@const artifactSet = characterArtifacts[slotType]?.artifactSet}
        <ArtifactSlotElement {slotType} {charName} {artifactSet} />
    {/each}
</div>

<style>
    div {
        display: flex;
    }
</style>
