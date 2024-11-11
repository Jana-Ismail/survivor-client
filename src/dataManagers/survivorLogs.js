import { fetchWithResponse } from "./fetcher"

export const getSurvivorLogs = (seasonLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }        
    })
}

export const getFavoriteSurvivors = (seasonLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/favorites`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export const addFavoriteSurvivor = (seasonLogId, survivorLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/favorites`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({"survivor_log_id": survivorLogId})
    })
}

export const getWinnerPick = (seasonLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/winner-pick`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }        
    })
}

export const updateWinnerPick = (seasonLogId, survivorLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/winner-pick`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`            
        },
        body: JSON.stringify({"survivor_log_id": survivorLogId})
    })
}