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

export const editSurvivorNote = (seasonLogId, survivorLogId, note) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/${survivorLogId}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(note)
    })
}

export const deleteSurvivorNote = (seasonLogId, survivorLogId, note) => {
    return fetchWithResponse(`season-logs/${seasonLogId}/survivors/${survivorLogId}/notes/${note.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
    })
}