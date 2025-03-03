<script lang="ts" module>
    import { ModalManager } from "@/lib/modals/ModalManager.svelte";
    export const modals = new ModalManager();
</script>

{#each modals.stack as modal}
    <modal.component {...modal.props} />
{/each}
