<script>
    import Popup from "../../../decor/Popup.svelte";
    import { api } from "../../../storage";
    import { popup } from "../../../utils";

    export let createCardPopup, createTransactionPopup, infoPopup, nowCard, cards, updateCards, updateHistory, setNowCard

    let buttonsLoading = {
        create: false,
        transaction: false
    }
    export function showCreateTransactionPopup(){
        createTransactionPopup.show()
    }

    export function showInfoPopup(){
        infoPopup.show()
    }

    export function showCreateCardPopup(){
        createCardPopup.show()
    }
    
</script>

<Popup bind:this={createCardPopup} custom={true} visible={false}>
    <form on:submit={async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        buttonsLoading.create = true
        let req = await fetch(api.bank.cards, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        buttonsLoading.create = false
        if(req.ok){
            const res = await req.json()
            await updateCards()
            if($cards.length == 1){
                await setNowCard($cards[0])
                await updateHistory()
            }
            
            createCardPopup.hide()
        }else{
            const res = await req.json()
            popup('Error', res.detail)
        }
    }} class="flex flex-col gap-[10px] min-w-[200px]">
        <span class="text-[18px] font-[700]">Create card</span>
        <select name="type" id="">
            <option value="MasterCard">MasterCard</option>
            <option value="Visa">Visa</option>
        </select>
        {#if buttonsLoading.create}
            <button disabled>...</button>
        {:else}
            <button>Create</button>
        {/if}
    </form>
</Popup>

{#if $nowCard}

    <Popup bind:this={createTransactionPopup} custom={true} visible={false}>
        <form on:submit={async (e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            data.set('to_card', data.get('to_card').replaceAll(" ", ""))
            buttonsLoading.transaction = true
            let req = await fetch(api.bank.transactions, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            
            if(req.ok){
                const res = await req.json()
                await updateCards()
                await updateHistory()
                createTransactionPopup.hide()
            }else{
                const res = await req.json()
                popup('Error', res.detail)
            }
            buttonsLoading.transaction = false
        }} class="flex flex-col gap-[10px] min-w-[200px]">
            <span class="text-[18px] font-[700]">Create transactions</span>
            <input type="hidden" required name="from_card" value={$nowCard.number}>
            <input type="text" required name="to_card" placeholder="To card" id="">
            <input type="number" required placeholder="Amount" step="0.01" name="amount">
            {#if buttonsLoading.transaction}
                <button disabled>...</button>
            {:else}
                <button>Create</button>
            {/if}
        </form>
    </Popup>

    <Popup bind:this={infoPopup} custom={true} visible={false}>
        <div class="flex flex-col gap-[10px] min-w-[200px]">
            <span>Number: {`${String($nowCard.number).slice(0, 4)} ${String($nowCard.number).slice(4, 8)} ${String($nowCard.number).slice(8, 12)} ${String($nowCard.number).slice(12, 16)}`}</span>
            <span>CVC: {$nowCard.csc}</span>
            <span>Expire: {String((new Date($nowCard.expire)).getFullYear()).slice(2, 4)}/{String((new Date($nowCard.expire)).getMonth()).length == 1 ? `0${(new Date($nowCard.expire)).getMonth()}` : (new Date($nowCard.expire)).getMonth()}</span>
            <button on:click={infoPopup.hide}>Close</button>
        </div>
    </Popup>

{/if}
