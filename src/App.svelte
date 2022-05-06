<script>
	import { onMount } from "svelte";
	import { Router, Link, Route, navigate } from "svelte-routing";
	import Profile from "./pages/logged/Profile.svelte";
	import Popup from "./decor/Popup.svelte";
	import Login from "./pages/Login.svelte";
	import Register from "./pages/Register.svelte";
	import { api, profile } from './storage.js'

	let loading = true
	
	onMount(async () => {
		if(localStorage.getItem('token')){
			let req = await fetch(api.auth.profile, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			})
			if(req.ok){
				profile.set(await req.json())
				isLogged = $profile == undefined ? false : true
			}else{
				localStorage.removeItem('token')
				window.location.reload()
			}

			loading = false
		}else{
			loading = false
		}
	})
	
	let popup
	
	document.addEventListener('popup', (e) => {
		popup.setTitle(e.title)
		popup.setContent(e.content)
		popup.show()
	})
	let isLogged = $profile == undefined ? false : true

	export let url = "";
</script>
  
<Router url="{url}">
{#if !loading}
<div>
	{#if isLogged}
		<Route path="profile">
			<Profile />
		</Route>
	{:else}
		<Route path="login">
			<Login />
		</Route>
		<Route path="register">
			<Register />
		</Route>
	{/if}
	<Route>
		{navigate(isLogged ? '/profile' : '/login')}
	</Route>
	</div>
{/if}
</Router>

<Popup bind:this={popup} />
