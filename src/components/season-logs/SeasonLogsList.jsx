import { useEffect, useState } from "react"
import { useAppContext } from "../../context/state"
import { getSeasonLogs } from "../../dataManager/seasonLogs"
import { Link } from "react-router-dom"

export const SeasonLogsList = () => {
    const {token} = useAppContext()
    const [seasonLogs, setSeasonLogs] = useState([])
    const [activeLogs, setActiveLogs] =useState([])
    const [completedLogs, setCompletedLogs] = useState([])
    const [inactiveLogs, setInactiveLogs] = useState([])

    useEffect(() => {
        getSeasonLogs().then(seasonLogsData => {
            if (seasonLogsData) {
                setSeasonLogs(seasonLogsData)
            }
        })
    }, [])

    useEffect(() => {
        if (seasonLogs) { 
            setActiveLogs(seasonLogs.active || [])
            setCompletedLogs(seasonLogs.complete || [])
            setInactiveLogs(seasonLogs.inactive || [])
        }
     }, [seasonLogs])

    return (
        <div>
            <h3>Actively Watching</h3>
            {activeLogs?.map((log) => {
                return(
                    <Link to={`/season-logs/${log.id}`} key={log.id}>
                        <div>Season #{log.season.season_number}</div>
                    </Link>
                )
            })}
            <h3>Completed</h3>
            {completedLogs?.map((log) => {
                return (
                    <Link to={`/season-logs/${log.id}`} key={log.id}>
                        <div>Season #{log.season.season_number}</div>
                    </Link>
                )
            })}
            <h3>Unwatched Seasons</h3>
            {inactiveLogs?.map((season) => {
                return(
                    <Link to={`/season-logs/create`} key={season.id} state={{season: season}}>
                        <div>Season #{season.season_number}</div>
                    </Link> 
                )
            })}
        </div>
    )
}