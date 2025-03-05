<script lang="ts">
    import type { ModalProps } from "@/lib/modals/Modal.svelte";
    import type { Snippet } from "svelte";
    // only need isOpen so Pick just that
    interface Props extends Pick<ModalProps, "isOpen"> {
        children: Snippet;
        // temporary fix for incorrect ownership warning on snippets with bindable properties
        bindFix?: any;
    }
    let { isOpen, children, bindFix = $bindable() }: Props = $props();
</script>

<!-- TODO: It is not necessary to nest the elements; have them as siblings -->
<!-- TODO: add close() to ModalManager, and call it when backdrop is clicked -->
{#if isOpen}
    <div class="backdrop">
        <div>
            <div class="window">
                <div role="dialog" class="modal">
                    {@render children()}
                </div>
            </div>
        </div>
    </div>
{/if}

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
