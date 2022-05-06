<script>
    import Desktop from "../../components/profile/Desktop.svelte";
    import Mobile from "../../components/profile/Mobile.svelte";

    import { api, profile } from "../../storage";
    let width = window.innerWidth
    window.onresize = (e) => {
        width = window.innerWidth
    }


</script>

{#if width < 1470}
    <Mobile />
{:else}
    <Desktop />
{/if}