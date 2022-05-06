<script>
    export let nowCard, card, setNowCard
</script>

<div on:click={async (e) => {
    await setNowCard(card)
}} 
class="p-[2px] cursor-pointer hover:mt-[-5px] hover:mb-[5px]" 
style="border: 5px solid {$nowCard.id === card.id ? "rgba(45, 188, 59, 0.5)" : "rgba(45, 188, 59, 0)"}; transition: .3s ease; border-radius: 32px;">
    <div class="relative" style="">
        <img border="0" src="{card.type == "MasterCard" ? "/images/mastercard.png" : "/images/visa.png"}" alt="">
        <div class="flex justify-between absolute top-0 p-[23px]" style="width: 100%;">
            <img src="/images/logo-white.png" alt="">
            <span class="text-[#2DBC3B] text-[16px] font-[700]">{card.balance} $</span>
        </div>
        <div class="flex justify-between absolute bottom-0 p-[23px]" style="width: 100%;">
            <span class="text-[#fff] text-[14px]">{String((new Date(card.expire)).getFullYear()).slice(2, 4)}/{String((new Date(card.expire)).getMonth()).length == 1 ? `0${(new Date(card.expire)).getMonth()}` : (new Date(card.expire)).getMonth()}</span>
        </div>
    </div>
</div>