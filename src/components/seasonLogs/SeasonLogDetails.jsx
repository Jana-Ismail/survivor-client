import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { getSeasonLogById } from "../../dataManagers/seasonLogs"
import { SurvivorLogList } from "../survivorLogs/survivorLogList"
import { SeasonLogFilter } from "./SeasonLogFilterBar"

export const SeasonLogDetails = () => {
    const { seasonLogId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // Use the log from state if available
    const [seasonLog, setSeasonLog] = useState(location.state?.log || null)


    useEffect(() => {
        if (!seasonLog && seasonLogId) {
            getSeasonLogById(seasonLog.id).then(seasonLogData => {
                if (seasonLogData) {
                    setSeasonLog(seasonLogData)
                }
            })
        }
    }, [seasonLogId])

    // if (!seasonLog) return <div>Loading...</div>

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-4">
                Season #{seasonLog.season.season_number} Log
            </h2>
            
            <SeasonLogFilter />
            
            {location.pathname === `/season-logs/${seasonLogId}` ? (
                <SurvivorLogList seasonLog={seasonLog} />
            ) : (
                <Outlet context={{ seasonLog }} />
            )}
        </div>
    )
}