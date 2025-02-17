<!-- this is purely utility to be mounted (inside artifactManger) when the extension loads -->
<script>
    import { Modals } from "svelte-modals";
</script>

<Modals>
    {#snippet backdrop({ close })}
        <div class="backdrop" onclick={() => close()} role="presentation"></div>
    {/snippet}
</Modals>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
