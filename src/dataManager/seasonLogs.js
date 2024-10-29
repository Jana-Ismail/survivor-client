import { fetchWithResponse } from "./fetcher"

export const getSeasonLogs = () => {
    return fetchWithResponse('season-logs', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}

export const getSeasonLogById = (id) => {
    return fetchWithResponse(`season-logs/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}