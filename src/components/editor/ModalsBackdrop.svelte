<!--
this is purely utility to be mounted (inside artifactManager) when the extension loads

both the backdrop and the modals are injected as separate elements to document.body.
They are not nested in any way. This is due to the way svelte-modals works.
This does cause some issues when using the classes and styling from Genshin Center, so those
need to be modified.
-->
<script lang="ts">
    import { Modals } from "svelte-modals";
</script>

<Modals>
    {#snippet backdrop({ close })}
        <div
            role="presentation"
            class="backdrop"
            onclick={() => {
                close();
            }}
        ></div>
    {/snippet}
</Modals>

<style>
    .backdrop {
        width: 100vw;
        z-index: 10000;
        position: absolute;
        inset: 0px;
        pointer-events: all;

        /* Window_window__0zdsm */
        display: flex;
        position: fixed;
        justify-content: center;
        inset: 0px;
        background-color: rgba(10, 10, 20, 0.96);
        width: 100vw;
        height: 100%;
    }
</style>
