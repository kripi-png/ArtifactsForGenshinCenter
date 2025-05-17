<script lang="ts">
    import type { ModalProps } from "@/lib/modals/Modal.svelte";
    import ModalBase from "./ModalBase.svelte";
    interface Props extends ModalProps {}
    let { isOpen, close }: Props = $props();
</script>

<ModalBase {isOpen}>
    <!-- <div>{data}</div> -->
    <div class="modalHeader">
        <h3>Import / Export</h3>
    </div>
    <div class="PlannerOptions_infoBox__41So_">
        <h3>Export</h3>
        <p>
            Export extension's save data. The data can then be saved to file and
            saved between users or computers, for example.
        </p>
        <h3>Import</h3>
        <p>
            Import previously exported extension save data.<br />
            <span style="color: red;"
                >This does NOT support GOOD format or others!</span
            >
        </p>
    </div>
</ModalBase>

<style>
    .modalHeader {
        /* Schedule_taskTopBar__lV1W8 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        flex-direction: column;
    }

    .modalHeader > h3 {
        font-size: 26px;
        line-height: 54px;
        font-weight: 800;
        flex-grow: 1;
        text-align: center;
    }
</style>
