import { fetchWithResponse } from "./fetcher"

export const createEpisodeLog = (seasonLogId, episodeLogData) => {
    return fetchWithResponse(`/season-logs/${seasonLogId}/episodes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`                
        },
        body: JSON.stringify(episodeLogData)
    })
}