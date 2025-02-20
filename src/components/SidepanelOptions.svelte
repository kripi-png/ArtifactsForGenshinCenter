<script lang="ts">
    import { userArtifactStore } from "@/lib/storage";
    import {
        STORE_LINK,
        GITHUB_LINK,
        SURVEY_LINK,
        CHECKMARK_VALUES,
    } from "@/constants";

    let isDisabled = $derived($userArtifactStore.__DISABLED);
    let checkmarkValues = $derived(
        isDisabled ? CHECKMARK_VALUES.off : CHECKMARK_VALUES.on,
    );

    const toggleDisabled = () => {
        $userArtifactStore.__DISABLED = !isDisabled;
        animateCheckmark(!isDisabled);
    };

    let pathElement: SVGPathElement | null = null;
    const animateCheckmark = (isDisabled: boolean): void => {
        if (pathElement === null) return;
        const start = isDisabled ? CHECKMARK_VALUES.off : CHECKMARK_VALUES.on;
        const end = isDisabled ? CHECKMARK_VALUES.on : CHECKMARK_VALUES.off;

        pathElement.animate(
            [{ strokeDasharray: start }, { strokeDasharray: end }],
            {
                duration: 250,
                easing: "ease-in-out",
                fill: "forwards",
            },
        );
    };
</script>

<div class="PlannerOptions_quickSection__pWVYz">
    <div class="PlannerOptions_titleWrapper__pAkcp">Extension Settings</div>
    <div class="Checkbox_checkbox__yM8Z5">
        <div class="Checkbox_buttonWrapper__P_Q_b">
            <button
                role="checkbox"
                aria-checked={!isDisabled}
                aria-labelledby="showAllArtifactsTitle"
                onclick={toggleDisabled}
            >
                <svg
                    class="Checkbox_checkmark__9GKLF"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                >
                    <path
                        bind:this={pathElement}
                        class="Checkbox_checkmarkCheck__ZKcSz"
                        d="m14 27 7 7 16-16"
                        stroke-dashoffset="0px"
                        stroke-dasharray={checkmarkValues}
                    ></path>
                </svg>
            </button>
        </div>
        <h3 id="showAllArtifactsTitle">Show all artifacts</h3>
    </div>
    <br />

    <div class="Radio_radioLabel__FlU7k" style="color: #38a6c2">
        <p>Enjoying the extension?</p>
        <p>
            Consider <a target="_blank" href={STORE_LINK}>reviewing</a>,
            <a target="_blank" href={GITHUB_LINK}>starring on GitHub</a>, or
            filling out a
            <a target="_blank" href={SURVEY_LINK}>feedback survey</a>. Thanks!
            <span style="color: #ccc">{"<3"}</span>
        </p>
    </div>
</div>
