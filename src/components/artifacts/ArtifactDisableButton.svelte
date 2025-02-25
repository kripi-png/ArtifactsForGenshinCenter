<script lang="ts">
    import { userArtifactStore } from "@/lib/storage";

    interface Props {
        characterName: string;
    }
    let { characterName }: Props = $props();

    let isDisabled = $state(false);
    onMount(() => {
        isDisabled =
            $userArtifactStore.characters[characterName]?.disabled ?? false;
    });

    const toggleDisabled = () => {
        isDisabled = !isDisabled;

        // if character data doesn't exist, create it with the correct disabled state
        if (!$userArtifactStore.characters[characterName]) {
            $userArtifactStore.characters[characterName] = {
                disabled: isDisabled,
                artifacts: {},
            };
            return;
        }
        // otherwise just update the disabled state
        $userArtifactStore.characters[characterName].disabled = isDisabled;
    };
</script>

<!-- use the ItemPanel_buttonWrapper__KgdUz because it has all the hover effects conveniently out of the box -->
<div
    title={isDisabled ? "Show Artifacts" : "Hide Artifacts"}
    class="ItemPanel_buttonWrapper__KgdUz"
    style="right: 80px"
>
    <button
        onclick={toggleDisabled}
        aria-label={isDisabled ? "Show Artifacts" : "Hide Artifacts"}
    >
        <div class="glow"></div>
        <div class="innerBorder"></div>
        <div class="inner"></div>
        <div class="image">
            <div
                class="containedImage"
                style="background-image: url('https://i.imgur.com/liC3uM6.png')"
            ></div>
        </div>
    </button>
</div>

<style>
    button {
        /* .CircleButton_button__WO_pU */
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 34px;
        width: 34px;
        flex-shrink: 0;
        border-radius: 100%;
        z-index: 0;
        background-color: hsla(39, 32%, 79%, 0.6);
        transition: opacity 0.1sease-in-out;
        -webkit-tap-highlight-color: transparent;
    }
    button .glow {
        /* .CircleButton_glow__dQqlu */
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        opacity: 0;
        box-shadow: 0 0 7px 0 #aaa;
        transition: opacity 0.1sease-in-out;
    }

    button .innerBorder {
        /* .CircleButton_innerborder__OFRXM */
        background-color: #fff;
        transition: transform 0.1sease-in-out;
        position: absolute;
        height: 28px;
        width: 28px;
        border-radius: 100%;
    }

    button .inner {
        /* CircleButton_inner__VXFE7 */
        position: absolute;
        height: 28px;
        width: 28px;
        border-radius: 100%;
    }

    button .image {
        /* CircleButton_img__OGgKs */
        height: 18px;
        width: 18px;
        z-index: 1;
        pointer-events: none;
    }
</style>
