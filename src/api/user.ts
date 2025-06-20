export default async function fetchUser(token: string){
    const res = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){throw new Error("Failed to fetch user data")}
    return res.json()
}