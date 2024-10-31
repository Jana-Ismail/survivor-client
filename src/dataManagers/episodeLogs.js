import { fetchWithResponse } from "./fetcher"

export const createEpisodeLog = (episodeLogData) => {
    return fetchWithResponse(`/season-logs/${seasonLog.id}/episodes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`                
        },
        body: JSON.stringify()
    })
}