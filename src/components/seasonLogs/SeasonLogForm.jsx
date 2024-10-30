import { useLocation, useNavigate } from "react-router-dom"
import { createSeasonLog } from "../../dataManagers/seasonLogs"

export const SeasonLogForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const season = location.state?.season

    const handleSubmit = () => {
        createSeasonLog(season.id).then((newSeasonLog) => {
            if (newSeasonLog) {
                navigate(`/season-logs/${newSeasonLog.id}`, {
                    state: { log: newSeasonLog }
                })
            }
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h3 className="text-xl font-semibold mb-4">
                Would you like to start a season log for Season #{season.season_number}?
            </h3>
            <button 
                onClick={handleSubmit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                START LOG
            </button>
        </div>
    )
}