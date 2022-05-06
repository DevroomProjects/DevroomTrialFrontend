<script>
    import Transaction from "./Transaction.svelte";

    export let nowCard, popups, history

    $: console.log($nowCard)
</script>

<div class="mt-[16px] bg-white p-[20px]  flex flex-col gap-[11px]">
    <div class="flex gap-[20px] items-center">
        {#if $nowCard.type == "Visa"}
            <img src="/images/visa-medium.png" alt="">
        {:else if $nowCard.type == "MasterCard"}
            <img src="/images/mastercard-medium.png" alt="">
        {/if}
        <div class="flex flex-col gap-[2px]">
            <span class="text-[20px] font-[700]">Card ** {String($nowCard.number).slice(12, 16)}</span>
            <span class="text-[16px] text-default font-[500]">{$nowCard.balance} $</span>
        </div>
    </div>
    <button on:click={popups.showCreateTransactionPopup}>Create transaction</button>
    <button class="bg-[#6A6A6A] pl-[30px] hover:bg-[#6A6A6A] pr-[30px]" on:click={popups.showInfoPopup}>Card information</button>
</div>
<div class="mt-[16px] flex-col gap-[15px] flex bg-white p-[20px]">
    <span class="text-[20px] font-[700]">History</span>
    {#if $history.length}
        {#each $history as transaction}
            <Transaction {transaction} {nowCard} />
        {/each}
    {:else}
        <span class="text-[20px] font-[800]">So far, your history is empty...</span>
        <span class="text-[16px] font-[500]">We are looking forward to your first translation</span>
    {/if}
</div>