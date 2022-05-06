<script>
    import { links } from "svelte-routing";
    import { api, profile } from "../storage";
    import { popup } from '../utils'
    
    let buttonLoading = false
</script>
    
<div class="flex mt-[80px] w-full justify-center">
    <form on:submit={async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        for(let key of data.keys()){
            if(!data.get(key)){
                popup('Error', 'Fill in all fields')
                return
            }
        }
        if(data.get('password') != data.get('passwordRepeat')){
            popup('Error', 'Passwords don\'t match')
            return
        }
        buttonLoading = true
        let req = await fetch(api.auth.register, {
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
    }} class="flex flex-col items-start gap-[18px] bg-white p-[23px] rounded-[5px]">
        <img src="/images/logo.png" alt="">
        <input name="name" type="text" placeholder="Name">
        <input name="email" type="email" placeholder="E-mail">
        <input name="password" type="password" placeholder="Password">
        <input name="passwordRepeat" type="password" placeholder="Repeat password">
        <div class="flex w-full justify-between items-center">
        {#if buttonLoading}
            <button disabled class="pl-[13px] pr-[13px]">...</button>
        {:else}
            <button class="pl-[13px] pr-[13px]">Register</button>
        {/if}
        <a use:links href="/login" style="text-decoration: underline;" class="text-[#2DBC3B]">Have account?</a>
    </form>
</div>