<script>
    export let setNowCard, card
</script>

<div on:click={async (e) => {
    await setNowCard(card)
}} class="flex cursor-pointer gap-[17px] w-full p-[7.5px]">
    <img src="{card.type == "MasterCard" ? "/images/mastercard-mini.png" : "/images/visa-mini.png"}" alt="">
    <div class="flex gap-[2px] flex-col">
        <span>Card ** {String(card.number).slice(12, 16)}</span>
        <span class="text-[14px] text-[#2DBC3B] font-[500]">{card.balance} $</span>
    </div>
</div>