import { fetchWithResponse } from "./fetcher"

export const getSeasonLogs = () => {
    return fetchWithResponse('season-logs', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
}