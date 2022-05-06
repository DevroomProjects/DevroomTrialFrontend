<script>
    import { links } from "svelte-routing";
    import { navigate } from "svelte-routing";
    import { api, profile } from "../storage";
    import { popup } from "../utils";
    let buttonLoading = false
</script>

<div on:submit={async (e) => {
    e.preventDefault()
    
    const data = new FormData(e.target)
    for(let key of data.keys()){
        if(!data.get(key)){
            popup('Error', 'Please, fill in all fields')
            return
        }
    }
    buttonLoading = true
    let req = await fetch(api.auth.login, {
        method: 'POST',
        body: data
    })
    
    if(req.ok){
        const res = await req.json()
        localStorage.setItem('token', res.token)
        profile.set(res)
        window.location.href = "/profile"
    }else{
        buttonLoading = false
        const res = await req.json()
        popup('Error', res.detail)
    }
}} class="flex mt-[80px] w-full justify-center">
    <form class="flex flex-col items-start gap-[18px] bg-white p-[23px] rounded-[5px]">
        <img src="/images/logo.png" alt="">
        <input name="email" type="email" placeholder="E-mail">
        <input name="password" type="password" placeholder="Password">
        <div class="flex w-full justify-between items-center">
            {#if buttonLoading}
                <button disabled class="pl-[13px] pr-[13px]">...</button>
            {:else}
                <button class="pl-[13px] pr-[13px]">Login</button>
            {/if}
            <a use:links href="/register" style="text-decoration: underline;" class="text-[#2DBC3B]">Create account</a>
        </div>
    </form>
</div>
