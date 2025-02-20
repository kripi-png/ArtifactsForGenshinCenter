<script lang="ts">
    import type { ModalProps } from "svelte-modals";
    import ModalBase from "./ModalBase.svelte";
    interface Props extends ModalProps {
        data: string;
    }
    let { isOpen, close, data }: Props = $props();
</script>

<ModalBase {isOpen}>
    <!-- <div>{data}</div> -->
    <div class="modalHeader">
        <h3>Export Artifact Data</h3>
    </div>
    <div class="modalContent" style="padding: 0 10px 15px;">
        <section>
            <p class="sectionName">Export Data</p>
            <div class="inputWrapper">
                <div class="inputGlow"></div>
                <div class="inputInnerBorder"></div>
                <input value={data} type="text" name="exportDataField" />
            </div>
        </section>
        <div class="buttonWrapper">
            <button onclick={close}>Close</button>
        </div>
    </div>
</ModalBase>

<style>
    .modalHeader {
        /* Schedule_taskTopBar__lV1W8 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        flex-direction: column;
    }

    .modalHeader > h3 {
        font-size: 26px;
        line-height: 54px;
        font-weight: 800;
        flex-grow: 1;
        text-align: center;
    }

    section {
        /* Schedule_section__8Bf3I */
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;
        margin-bottom: 10px;
    }

    section .sectionName {
        /* Schedule_sectionName___uDY_ */
        color: #ffd780;
        font-size: 18px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .inputWrapper {
        /* Input_input__aT3TM */
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: hsla(39, 32%, 79%, 0.6);
        width: 100%;
        height: 100%;
        border-radius: 3px;
        /* Schedule_inputWrapper__uMtN0 */
        height: 48px;
        width: 100%;
        margin-bottom: 8px;
    }

    section .inputWrapper input {
        /* Input_inner__SXgrG */
        font-size: 16px;
        color: black;
        background-color: #ece5d8;
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        text-align: center;
        font-weight: 800;
        position: absolute;
        border-radius: 3px;
    }

    .inputInnerBorder {
        /* Input_innerborder__MMhtd */
        background-color: #fff;
        transition: transform 0.1sease-in-out;
        height: 100%;
        width: 100%;
        transform: scale(0.8, 0.7);
        position: absolute;
        border-radius: 3px;
    }

    .inputGlow {
        /* Input_glow__nybES */
        position: absolute;
        opacity: 0;
        box-shadow: 0 0 7px 0 #aaa;
        transition: opacity 0.2sease-in-out;
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .buttonWrapper {
        /* Schedule_buttonsWrapper__fdOV_ */
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    .buttonWrapper button {
        padding: 10px 40px;
        border: #ece5d8 solid 1.5px;
        border-radius: 20px;
        transition: 0.2s;
    }

    .buttonWrapper button:hover {
        border: #1e2231 solid 1.5px;
        background: #ece5d8;
        color: #1e2231;
        cursor: pointer;
        font-weight: 700;
        transition: 0.2s;
    }

    .buttonWrapper button:focus {
        filter: brightness(70%);
        transition: 0.2s;
    }
</style>
