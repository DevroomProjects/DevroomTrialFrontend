<script>
    import { onMount } from "svelte";

    import { writable } from "svelte/store";
    import Popup from '../../decor/Popup.svelte'
    import { api } from "../../storage";
    import { popup } from "../../utils";
    import MobileCard from "./components/MobileCard.svelte";
    import NowCardMobile from "./components/NowCardMobile.svelte";
    import Popups from "./components/Popups.svelte";
    import Transaction from "./components/Transaction.svelte";

    let loading = true
    let cards = writable([])
    let nowCard = writable()
    let history = writable([])

    async function updateCards(){
        let req = await fetch(api.bank.cards, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        cards.set(await req.json())
        if($nowCard){
            await setNowCard($cards.filter((v) => v.id == $nowCard.id)[0])
        }
    }

    onMount(async () => {
        await updateCards()
        loading = false
    })

    async function setNowCard(card){
        nowCard.set(card)
        await updateHistory()

    }

    async function updateHistory(){
        let req = await fetch(api.bank.cards + `${$nowCard.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        history.set([...(await req.json()).history])
        
    }
    
    let popups 
</script>

<div class="flex flex-col mb-[100px]">
    <div class="flex p-[20px] bg-white w-full">
        <img on:click={() => {
            nowCard.set(null)
        }} src="/images/logo.png" alt="">
    </div>
    {#if $nowCard}
        <NowCardMobile {nowCard} {popups} {history} />
    {:else}
        <div class="flex gap-[1px] flex-col mt-[16px] bg-white p-[20px]">
            {#if $cards.length}
                {#each $cards as card}
                    <MobileCard {card} {setNowCard} />
                {/each}
            {:else}
                <span class="text-[20px] font-[800]">You don't have bank cards yet...</span>
                <span class="text-[16px] font-[500]">But you can create it right now!</span>
            {/if}
            <button on:click={popups.showCreateCardPopup}>Create card</button>
        </div>
    {/if}
    <div class="fixed bottom-0 flex justify-center items-center p-[20px] pt-[15px] pb-[15px] bg-white w-full">
        <div class="flex flex gap-[80px]">
            <div on:click={() => {
                nowCard.set(null)
            }} class="flex flex-col items-center gap-[3px]">
                <img src="/images/profile.png" alt="">
                <span class="font-[700] text-[15px] text-[#B3B3B3]">Profile</span>
            </div>
            <div on:click={async (e) => {
                let req = await fetch(api.auth.logout, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                window.location.reload()
            }}  class="flex flex-col items-center gap-[3px]">
                <img src="/images/logout.png" alt="">
                <span class="font-[700] text-[15px] text-[#BC2D2D]">Logout</span>
            </div>
        </div>
    </div>
</div>

<Popups {nowCard} {cards} bind:this={popups} {updateCards} {updateHistory} {setNowCard} />