import { useEffect } from "react"
import { useAppContext } from "../../context/state"
import { getSeasonLogs } from "../../dataManager/season-logs"

export const SeasonLogsList = () => {
    const {token} = useAppContext()
    useEffect(() => {
        getSeasonLogs()
    }, [])

    return <>Season Logs List will go here</>
}