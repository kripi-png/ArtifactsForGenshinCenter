<script lang="ts">
    import type { ArtifactData } from "@/types";

    interface Props {
        sectionName: string;
        type?: "text" | "checkbox";
        placeholder?: string;
        listAttribute?: string;
        name: keyof ArtifactData;
        artifact: ArtifactData;
    }
    const {
        sectionName,
        type = "text",
        placeholder = "",
        listAttribute,
        name,
        artifact = $bindable(),
    }: Props = $props();
</script>

<section>
    <p class="sectionName">{sectionName}</p>
    <div class="inputWrapper">
        <div class="inputGlow"></div>
        <div class="inputInnerBorder"></div>
        {#if type === "checkbox"}
            <input type="checkbox" bind:checked={artifact.check} {name} />
        {:else}
            <input
                bind:value={artifact[name]}
                type="text"
                {name}
                {placeholder}
                list={listAttribute}
                maxlength={listAttribute ? 40 : 20}
            />
        {/if}
    </div>
</section>

<style>
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

    .inputWrapper:has(input[type="checkbox"]) {
        margin: 0;
        width: 48px;
        /* margin-left: calc(50% - 24px); */
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
</style>
