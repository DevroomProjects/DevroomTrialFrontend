<script>
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

    import { scale, fade } from 'svelte/transition';
    export let title=null;
    export let content;
    export let visible;
    export let custom=false;
    export let topMini=false;
    
    export function show(){
        visible = true
    }

    export function hide(){
        visible = false;
    }

    export function setVisible(v){
        visible = v
    }

    export function setContent(c){
        content = c
    }

    export function setTitle(t){
        title = t
    }


</script>
{#if visible}
    <div class="bg" style="overflow: auto; padding-bottom: 40px;" transition:fade={{ duration: 300 }} on:click={() => hide()}>
        <div style="{topMini ? 'margin-top: 20px; height: calc(100% - 80px); overflow: auto;' : ""}" class="popup" on:click={(e) => e.stopPropagation()} transition:scale={{ start: 2, duration: 300 }}>
            {#if custom}
                <slot />
            {:else}
                {#if title}<span class="font-bold text-[18px]">{title}</span>{/if}
                {#if content}<span>{content}</span>{/if}
                <button on:click={() => hide()}>Close</button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .bg{
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99;
    }

    .popup{
        max-width: 500px;
        padding: 20px;
        background-color: #fff;
        width: fit-content;
        margin: 0 auto;
        margin-top: 100px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .popup > * + *{
        margin-top: 6px;
    }
</style>