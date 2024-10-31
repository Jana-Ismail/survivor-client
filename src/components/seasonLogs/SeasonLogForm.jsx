import { useLocation, useNavigate } from "react-router-dom"
import { useSeasonContext } from "../../context/seasonContext"

export const SeasonLogForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { startSeasonLog, isLoading } = useSeasonContext()
    const season = location.state?.season

    const handleSubmit = async () => {

        if (!season?.id) return

        const newSeasonLog = await startSeasonLog(season.id)
        if (newSeasonLog?.id) {
                navigate(`/season-logs/${newSeasonLog.id}`, {replace: true})
        }
    }

    if (!season) {
        return <div className="text-center p-4">No season selected</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h3 className="text-xl font-semibold mb-4">
                Would you like to start a season log for Season #{season.season_number}?
            </h3>
            <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-gray-500 text-white px-4 py-2 rounded 
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
                {isLoading ? 'Creating Log...' : 'START LOG'}
            </button>
        </div>
    )
}