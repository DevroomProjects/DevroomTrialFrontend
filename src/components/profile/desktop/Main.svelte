<script>
    import { onMount } from "svelte";

    import { writable } from "svelte/store";
    import Popup from '../../../decor/Popup.svelte'
    import { api } from "../../../storage";
    import { popup } from "../../../utils";
    import Card from "../components/Card.svelte";
    import Transaction from "../components/Transaction.svelte";
    import Popups from "../components/Popups.svelte";
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
            let card = $cards.filter((v) => v.id == $nowCard.id)[0]
            nowCard.set(card)
        }
    }

    onMount(async () => {
        await updateCards()
        if($cards.length > 0){
            await setNowCard($cards[0])
        }
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



{#if !loading}
    {#if $cards.length > 0 && $nowCard}
        <div class="flex w-full gap-[50px] justify-between items-start p-[50px]">
            <div class="flex flex-col gap-[20px] min-w-[300px] items-start">
                <div class="flex gap-[10px] items-center">
                    <span class="text-[20px] font-[800]">My cards</span>
                    <img src="/images/plus.png" class="cursor-pointer" on:click={popups.showCreateCardPopup} alt="">
                </div>
                {#each $cards as card}
                    <Card {setNowCard} {nowCard} {card} />
                {/each}
                
            </div>
            <div class="flex w-full flex-col bg-[#fff] rounded-[15px] min-w-[400px]">
                <div class="w-full bg-default p-[23px]" style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
                    <span class="text-[18px] font-[900] text-[#fff]">History</span>
                </div>
                <div class="flex p-[23px]">
                    {#if $history.length > 0}
                        <div class="flex flex-col gap-[10px] w-full">
                            {#each $history as transaction}
                                <Transaction {transaction} {nowCard} />
                            {/each}
                        </div>
                    {:else}
                        <div class="flex w-full">
                            <div class="flex flex-col gap-[5px]">
                                <span class="text-[20px] font-[800]">So far, your history is empty...</span>
                                <span class="text-[16px] font-[500]">We are looking forward to your first translation</span>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col bg-[#fff] rounded-[15px] min-w-[300px]">
                <div class="w-full bg-default p-[23px]" style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
                    <span class="text-[18px] font-[900] text-[#fff]">Actions</span>
                </div>
                <div class="flex p-[23px] flex-col gap-[15px]">
                    <button on:click={popups.showCreateTransactionPopup} class="pl-[30px] pr-[30px]">Create transaction</button>
                    <button class="bg-[#6A6A6A] pl-[30px] hover:bg-[#6A6A6A] pr-[30px]" on:click={popups.showInfoPopup}>Card information</button>
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-col gap-[19px] w-full items-center mt-[160px]">
            <span class="text-[20px] font-[800]">You don't have bank cards yet...</span>
            <span class="text-[16px] font-[500]">But you can create it right now!</span>
            <button class="pr-[30px] pl-[30px]" on:click={popups.showCreateCardPopup}>Create card</button>
        </div>
    {/if}
{/if}

<Popups {nowCard} {cards} bind:this={popups} {updateCards} {updateHistory} {setNowCard} />