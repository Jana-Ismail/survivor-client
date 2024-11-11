import { useSeasonContext } from "../../context/seasonContext"
import { SurvivorLogCard } from "./SurvivorLogCard"

export const FavoriteSurvivorList = () => {
    const { 
        seasonLog, 
        survivorLogs, 
        changeWinnerPick,
        winnerPick,
        activeSurvivors
     } = useSeasonContext()

    const getAndSetFavorites = () => {
        
    }
    
    const handleWinnerPickChange = async (e) => {
        e.preventDefault()
        const survivorLogId = parseInt(e.target.value)
        if (seasonLog?.id && !isNaN(survivorLogId)) {
            await changeWinnerPick(seasonLog.id, survivorLogId)
        }
    }
     
    return (
        <div className="p-4">
            <div className="winner-pick-section mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    Winner Pick for Season #{seasonLog?.season?.season_number}
                </h2>
                
                <div className="stat-group pb-6">
                    <div className="stat-item">
                        <label htmlFor="winner-pick" className="stat-label block mb-2">
                            Select your winner:
                        </label>
                        <select
                            id="winner-pick"
                            value={winnerPick?.id || ''}
                            onChange={handleWinnerPickChange}
                            className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm 
                                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Choose a survivor...</option>
                            {activeSurvivors.map(survivor => (
                                <option key={survivor.id} value={survivor.id}>
                                    {survivor.survivor.first_name} {survivor.survivor.last_name[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {winnerPick?.survivor && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Current Winner Pick:</h3>
                        <div className="details-card-container">
                            <SurvivorLogCard survivorLog={winnerPick} />
                        </div>
                    </div>
                )}
            </div>

            <div className="favorites-section">
                <h2 className="text-2xl font-bold mb-4">
                    Favorite Survivors from Season #{seasonLog?.season?.season_number}
                </h2>
            </div>
        </div>
    )

}