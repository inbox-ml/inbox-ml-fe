import * as changeCase from "change-case/keys"

const HISTORY_URL = "http://127.0.0.1:8000"

async function getHistoryList(token: string){

    const resp = await fetch(`${HISTORY_URL}/user/history_list`, 
        {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })

    if(!resp.ok){throw new Error("Faild to fetch history data")}    

    const data = await resp.json();    
    return (data ?? []).map((item: Record<string, unknown>) => changeCase.camelCase(item))
}


export {getHistoryList}