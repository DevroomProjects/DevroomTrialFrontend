<script>
import { onMount } from "svelte";

    import { convertTZ, formatTime } from "../../../utils";


    export let transaction, nowCard;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    let createdAt
    $: createdAt = convertTZ(transaction.created_at, Intl.DateTimeFormat().resolvedOptions().timeZone)
</script>

<div class="flex justify-between items-center w-full">
    <div class="flex gap-[11px]">
        <div class="flex w-[48px] h-[48px] rounded-[70px] items-center justify-center " style="{transaction.type == 'transaction' ? 'background: rgba(230, 138, 0, 0.25);' : 
        transaction.type == 'deposit' ? 'background: rgba(45, 189, 59, 0.25);' : 
        ''}">
            {#if transaction.type == "transaction"}
                <img src="/images/transaction.png" alt="">
            {:else if transaction.type == "deposit"}
                <img src="/images/deposit.png" alt="">
            {/if}
        </div>
        <div class="flex gap-[2px] flex-col">
            {#if transaction.type == "transaction"}
                <span class="text-[16px]">Bank payment</span>
            {:else if transaction.type == "deposit"}
                <span class="text-[16px]">Demo deposit</span>
            {/if}
            <span class="text-[14px] text-[#6A6A6A]">{createdAt.getDate()} {monthNames[createdAt.getMonth()]}, {formatTime(createdAt)}</span>
        </div>
    </div>
    <div class="flex gap-[2px] flex-col items-end">   
        <span class="text-[{transaction.from_card  == $nowCard.number ? '#ADADAD' : '#2DBC3B'}]">{transaction.from_card  == $nowCard.number ? '' : '+'}{transaction.amount} $</span>
        {#if transaction.type == "transaction"}
            <span class="text-[#6A6A6A] text-[14px]">**** {transaction.from_card  == $nowCard.number ? String(transaction.to_card).slice(12, 16) : String(transaction.from_card).slice(12, 16)}</span>
        {:else if transaction.type == "deposit"}
            <span class="text-[#6A6A6A] text-[14px]">Koper Bank</span>
        {/if}
    </div>
</div>