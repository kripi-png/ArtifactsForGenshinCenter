<script module>
    // calculates the location of the hover pop up in relation to the hovered slot
    export const calculatePopupLocation = (
        slot: HTMLElement,
    ): { x: number; y: number } => {
        const rect = slot.getBoundingClientRect();
        const x = rect.left + slot.getBoundingClientRect().width;
        const y = rect.bottom - rect.height;

        return { x, y };
    };
</script>

<script lang="ts">
    import { ArtifactData } from "@/types";

    interface Props {
        artifact: ArtifactData;
        name: string;
        imageUrl: string;
        locX: number;
        locY: number;
    }
    let { artifact, name, imageUrl, locX, locY }: Props = $props();
</script>

<div
    id="artifactTooltipWindow"
    style="width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;"
>
    <div
        class="artifactTooltip"
        style="position: sticky; left: {locX}px; top: {locY}px;"
    >
        <div class="tooltipTitle">
            <p class="tooltipTitleText">
                <span>{name}</span><br />{artifact.artifactSet}
            </p>
            <img
                src={imageUrl}
                alt={`${name} of ${artifact.artifactSet}`}
                class="tooltipTitleIcon"
            />
        </div>
        <div class="tooltipTextWrapper">
            <p class="tooltipText">
                Main Stat: {artifact.mainStat}
            </p>
            <p class="tooltipText">
                Sub Stat: {artifact.subStats}
            </p>
        </div>
    </div>
</div>

<style>
    .artifactTooltip {
        position: absolute;
        background-color: black;
        width: 300px;
        font-weight: 600;
    }

    .tooltipTitle {
        background: linear-gradient(
            160deg,
            rgba(105, 84, 83, 0.565) 0%,
            rgba(161, 112, 78, 0.565) 39%,
            rgba(228, 171, 82, 0.565) 100%
        );
        display: flex;
    }

    .tooltipTitleText {
        font-size: 18px;
        padding: 15px 0 15px 15px;
        flex-grow: 1;
        color: #f7f7f7;
    }

    .tooltipTitleText > span {
        font-size: 14px;
        color: #ccc;
    }

    .tooltipTitleIcon {
        width: 128px;
        height: 128px;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        display: flex;
    }

    .tooltipTextWrapper {
        background-color: #ece5d8;
        color: #000;
        padding: 5px;
    }

    .tooltipText {
        padding: 2px 4px;
        margin: 2px;
    }
</style>
