import { fetchWithResponse } from "./fetcher"

export const getNotesBySurvivorLogId = (seasonLogId, survivorLogId) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/${survivorLogId}/notes`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export const createSurvivorNote = (seasonLogId, survivorLogId, note) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/${survivorLogId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`            
        },
        body: JSON.stringify(note)
    })
}