<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props {
        close: () => void;
        children: Snippet;
        // temporary fix for incorrect ownership warning on snippets with bindable properties
        bindFix?: any;
    }
    let { close, children, bindFix = $bindable() }: Props = $props();
</script>

<!-- TODO: create a wrapper for modals for easier management -->
<div class="backdrop">
    <div>
        <div class="window">
            <div role="dialog" class="modal">
                {@render children()}
            </div>
        </div>
    </div>
</div>

<style>
    .backdrop {
        width: 100vw;
        z-index: 10000;
        position: absolute;
        inset: 0px;
        pointer-events: all;
    }

    .window {
        display: flex;
        position: fixed;
        justify-content: center;
        inset: 0;
        background-color: rgba(10, 10, 20, 0.96);
        width: 100vw;
        height: 100%;
    }

    .modal {
        grid-template-rows: auto 1fr auto;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        display: grid;
        max-height: 95%;
        max-width: 96vw;
        background-color: #1e2231;
        border-radius: 5px;
        overflow: hidden;
    }
</style>
