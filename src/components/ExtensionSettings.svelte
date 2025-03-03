<script lang="ts">
    import ExportModal from "./modals/ExportModal.svelte";
    import { exportArtifactData, importArtifactData } from "@/lib/dataManager";
    import { mount, unmount } from "svelte";

    const importData = () => {
        // TODO: clean this up, use actual validation library or something
        const userInput = prompt(
            "Enter the data to import. Close to cancel:",
        )?.trim();
        if (
            !userInput ||
            !(typeof userInput === "string" || typeof userInput === "object") ||
            !isNaN(Number(userInput)) // is number
        )
            return;

        // confirmation
        const confirmation = prompt(
            "Importing WILL override all previous information. Type CONFIRM to continue.",
        )?.toLowerCase();
        if (!confirmation || confirmation !== "confirm") return;

        importArtifactData(userInput);
    };

    let modalRef: any = null;
    const exportData = () => {
        if (modalRef !== null) {
            console.error("Modal already exists!");
            return;
        }
        const close = () => {
            if (!modalRef) return;
            unmount(modalRef);
            modalRef = null;
        };

        const data = exportArtifactData();
        modalRef = mount(ExportModal, {
            target: document.body,
            props: { close, data },
        });
    };
</script>

<div class="PlannerOptions_section__y90n3">
    <div class="Radio_radio__t_pCN">
        <div class="Radio_radioLabel__FlU7k">Import & Export Artifact Data</div>
        <div class="import_export_wrapper" style="max-width: 440px;">
            <button onclick={importData} class="" title="Import Data">
                Import Data
            </button>
            <button onclick={exportData} title="Export Data">
                Export Data
            </button>
        </div>
    </div>
</div>

<style>
    .import_export_wrapper {
        /* modified Radio_options__vJPry */
        display: flex;
        width: 100%;
    }

    button {
        background-color: #ece5d8;
        color: #000;
        border-radius: 5px;
        width: 100%;
        padding: 3px;
        cursor: pointer;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
    }

    button:first-child {
        margin-right: 5px;
    }
    button:last-child {
        margin-left: 5px;
    }
</style>
