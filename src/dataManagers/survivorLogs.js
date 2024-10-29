import { fetchWithResponse } from "./fetcher"

export const getSurvivorLogs = (id) => {
    return fetchWithResponse(`/season-logs/${id}/survivors`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }        
    })
}