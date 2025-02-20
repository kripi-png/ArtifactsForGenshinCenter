<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props {
        isOpen: boolean;
        children: Snippet;
    }
    let { isOpen, children }: Props = $props();
</script>

{#if isOpen}
    <div role="dialog" class="modal_background">
        <div class="modal">
            {@render children()}
        </div>
    </div>
{/if}

<style>
    .modal_background {
        z-index: 50000;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .modal {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        display: grid;
        max-height: 95%;
        max-width: 96vw;
        background-color: #1e2231;
        border-radius: 5px;
        overflow: hidden;
        grid-template-rows: auto 1fr auto;
        opacity: 1;
        pointer-events: all;
    }
</style>
