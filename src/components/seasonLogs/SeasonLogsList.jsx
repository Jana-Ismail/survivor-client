import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AuthContext"
import { getSeasonLogs } from "../../dataManagers/seasonLogs"
import { Link } from "react-router-dom"
import './SeasonLogs.css'

export const SeasonLogsList = () => {
    const [seasonLogs, setSeasonLogs] = useState([])
    const [activeLogs, setActiveLogs] =useState([])
    const [completedLogs, setCompletedLogs] = useState([])
    const [inactiveLogs, setInactiveLogs] = useState([])

    const getAndSetSeasonLogs = () => {
        getSeasonLogs().then(seasonLogsData => {
            if (seasonLogsData) {
                setSeasonLogs(seasonLogsData)
            }
        })
    }

    useEffect(() => {
        getAndSetSeasonLogs()
    }, [])

    useEffect(() => {
        if (seasonLogs) { 
            setActiveLogs(seasonLogs.active || [])
            setCompletedLogs(seasonLogs.complete || [])
            setInactiveLogs(seasonLogs.inactive || [])
        }
     }, [seasonLogs])

     return (
        <div className="season-logs-container">
            {/* Active Seasons Section */}
            <div className="season-section active-section">
                <h2 className="section-title">Active Logs</h2>
                <div className="seasons-grid">
                    {activeLogs?.map((log) => (
                        <Link 
                            to={`/season-logs/${log.id}`} 
                            key={log.id} 
                            state={{ log }}
                        >
                            <div className="season-card">
                                <div className="season-number season-title">{log.season.name}</div>
                                <div className="season-number">Season #{log.season.season_number}</div>
                                {/* Add any additional season info you want to display */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Completed Seasons Section */}
            <div className="season-section completed-section">
                <h2 className="section-title">Completed Logs</h2>
                <div className="seasons-grid">
                    {completedLogs?.map((log) => (
                        <Link 
                            to={`/season-logs/${log.id}`} 
                            key={log.id}
                            state={{ log }}
                        >
                            <div className="season-card">
                                <div className="season-number season-title">{log.season.name}</div>
                                <div className="season-number">Season #{log.season.season_number}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Unwatched Seasons Section */}
            <div className="season-section unwatched-section">
                <h2 className="section-title">Inactive Seasons</h2>
                <div className="seasons-grid">
                    {inactiveLogs?.map((season) => (
                        <Link 
                            to={`/season-logs/create`} 
                            key={season.id} 
                            state={{ season }}
                        >
                            <div className="season-card">
                                <div className="season-number season-title">{season.name}</div>
                                <div className="season-number">Season #{season.season_number}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}