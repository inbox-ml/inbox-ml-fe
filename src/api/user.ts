import * as changeCase from "change-case/keys"

export async function fetchUser(token: string){
    const res = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){throw new Error("Failed to fetch user data")}
    const response = await res.json()
    return changeCase.camelCase(response)
}

export async function createUser(token: string){
    const res = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){throw new Error("Failed to create user record")}
    const response = await res.json()
    return changeCase.camelCase(response)
}