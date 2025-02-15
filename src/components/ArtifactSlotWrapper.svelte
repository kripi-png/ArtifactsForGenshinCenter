<script lang="ts">
    import ArtifactSlot from "./ArtifactSlot.svelte";
    const slotTypes: ArtifactSlotType[] = [
        "flower",
        "plume",
        "sands",
        "goblet",
        "circlet",
    ];

    export let charName: string;
</script>

<div data-character={charName}>
    {#each slotTypes as slotType}
        <ArtifactSlot {slotType} />
    {/each}
</div>

<style>
    div {
        display: flex;
    }
</style>
