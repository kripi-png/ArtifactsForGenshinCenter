<script lang="ts">
    import type { ModalProps } from "@/lib/modals/Modal.svelte";
    import type { Snippet } from "svelte";
    import { modals } from "./Modals.svelte";
    // only need isOpen so Pick just that
    interface Props extends Pick<ModalProps, "isOpen"> {
        children: Snippet;
        // temporary fix for incorrect ownership warning on snippets with bindable properties
        bindFix?: any;
    }
    let { isOpen, children, bindFix = $bindable() }: Props = $props();
</script>

{#if isOpen}
    <div role="presentation" class="backdrop" onclick={modals.close}></div>
    <div class="modal_background">
        <div role="dialog" class="modal">
            {@render children()}
        </div>
    </div>
{/if}

<style>
    .backdrop {
        width: 100vw;
        z-index: 20000;
        position: absolute;
        inset: 0px;
        pointer-events: all;
    }

    .modal_background {
        z-index: 20000;
        display: flex;
        position: fixed;
        justify-content: center;
        inset: 0;
        background-color: rgba(10, 10, 20, 0.96);
        width: 100vw;
        height: 100%;
        pointer-events: none;
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
        pointer-events: all;
    }
</style>
