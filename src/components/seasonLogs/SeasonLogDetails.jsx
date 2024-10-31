import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { SeasonLogFilter } from "./SeasonLogFilterBar"
import { useSeasonContext } from "../../context/seasonContext"

export const SeasonLogDetails = () => {
    const { seasonLogId } = useParams()
    const { seasonLog, isLoading, loadSeasonData } = useSeasonContext()
    

    useEffect(() => {
        loadSeasonData(seasonLogId)
    }, [seasonLogId, loadSeasonData])

    if (isLoading) {
        return <div className="text-center p-4">Loading season log...</div>        
    }

    if (!seasonLog) return <div>Loading...</div>

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-4">
                Season #{seasonLog.season.season_number} Log
            </h2>
            
            <SeasonLogFilter />
            
            <Outlet />
        </div>
    )
}