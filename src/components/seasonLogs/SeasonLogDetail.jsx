import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getSeasonLogById } from "../../dataManagers/seasonLogs"
import { SurvivorLogList } from "../survivorLogs/survivorLogList"

export const SeasonLogDetail = () => {
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

    return (
        <>
            <div>
                Season #{seasonLog.season.season_number} Log
            </div>
            <SurvivorLogList seasonLog={seasonLog}/>
        </>
    )
}