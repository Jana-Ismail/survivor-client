import { fetchWithResponse } from "./fetcher"

export const getSurvivorLogs = (seasonLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }        
    })
}

export const getSurvivorLogById = () => {
    return fetchWithResponse(`season-logs/{seasonLogId}`)
}