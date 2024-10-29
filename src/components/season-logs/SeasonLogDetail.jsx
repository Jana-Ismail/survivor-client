import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSeasonLogById } from "../../dataManager/seasonLogs"

export const SeasonLogDetail = () => {
    const {seasonLogId} = useParams()
    const [seasonLog, setSeasonLog] = useState({})

    useEffect(() => {
        getSeasonLogById(seasonLogId).then(seasonLogData => {
            if (seasonLogData) {
                setSeasonLog(seasonLogData)
            }
        })
    }, [seasonLogId])

    return (
        <div>
            Seaoson #{seasonLog.season.season_number} Log
        </div>
    )
}