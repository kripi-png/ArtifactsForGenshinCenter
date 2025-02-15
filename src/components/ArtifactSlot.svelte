<script lang="ts">
    export let slotType: ArtifactSlotType;
</script>

<div class={`${slotType}Slot`}></div>

<style>
    div {
        flex: 1;
        /* width: 60px; */
        height: 72px;
        background-size: cover;
        background-size: 72px 72px;
        background-repeat: no-repeat;
    }

    div:hover {
        cursor: pointer;
    }

    .flowerSlot {
        background-image: url("https://i.imgur.com/GqSEgvB.png");
    }
    .plumeSlot {
        background-image: url("https://i.imgur.com/FpKdZFQ.png");
    }
    .gobletSlot {
        background-image: url("https://i.imgur.com/0XhOfPS.png");
    }
    .sandsSlot {
        background-image: url("https://i.imgur.com/C1kloPS.png");
    }
    .circletSlot {
        background-image: url("https://i.imgur.com/AO6dMV6.png");
    }
</style>
