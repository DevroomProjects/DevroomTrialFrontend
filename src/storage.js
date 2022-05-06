import { writable } from "svelte/store";

export let profile = writable()
let host = "/api/"
export let api = {
    auth: {
        login: host + 'login/',
        register: host + 'register/',
        profile: host + 'profile/',
        logout: host + 'logout/'
    },
    bank: {
        cards: host + 'cards/',
        transactions: host + 'transactions/'
    }
}