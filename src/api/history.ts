import * as changeCase from "change-case/keys"

const HISTORY_URL = ""

async function getHistoryList(token: string){

    const resp = await fetch(`${HISTORY_URL}/list`, 
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    if(!resp.ok){throw new Error("Faild to fetch history data")}    

    const data = await resp.json();    
    return changeCase.camelCase(data)
}


export {getHistoryList}