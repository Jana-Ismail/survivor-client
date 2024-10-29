import { useLocation, useNavigate } from "react-router-dom"
import { createSeasonLog } from "../../dataManagers/seasonLogs"

export const SeasonLogForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const season = location.state?.season

    const handleSubmit = () => {
        createSeasonLog(season.id).then((newSeasonLogData) => {
            if (newSeasonLogData) {
                const newSeasonLogId = newSeasonLogData.id
                navigate(`/season-logs`)
            }
        })
    }

    return (
        <div>
            <h3>Would you like to start a season log for Season #{season.season_number}?</h3>
            <button onClick={handleSubmit}>START LOG</button>
        </div>
    )
}