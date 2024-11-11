import { useEffect, useState } from "react"
import { useSeasonContext } from "../../context/seasonContext"
import { getFavoriteSurvivors } from "../../dataManagers/survivorLogs"
import { SurvivorLogCard } from "./SurvivorLogCard"
import { FavoriteSurvivorLogForm } from "./FavoriteSurvivorLogForm"

export const FavoriteSurvivorList = () => {
    const [favoriteSurvivors, setFavoriteSurvivors] = useState([])
    const { 
        seasonLog, 
        changeWinnerPick,
        winnerPick,
        activeSurvivors
     } = useSeasonContext()

    const getAndSetFavorites = async () => {
        const favSurvivorsArray = await getFavoriteSurvivors(seasonLog?.id)
        if (favSurvivorsArray) {
            setFavoriteSurvivors(favSurvivorsArray)
        }
    }

    useEffect(() => {
        if (seasonLog.id) {
            getAndSetFavorites()
        }
    }, [seasonLog?.id])
    
    const handleWinnerPickChange = async (e) => {
        e.preventDefault()
        const survivorLogId = parseInt(e.target.value)
        if (seasonLog?.id && !isNaN(survivorLogId)) {
            await changeWinnerPick(seasonLog.id, survivorLogId)
        }
    }
     
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Season #{seasonLog?.season?.season_number} Favorites
            </h2>

            {/* Side-by-side containers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Winner Pick Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Winner Pick</h3>
                    <div className="mb-4">
                        <label htmlFor="winner-pick" className="block text-sm font-medium text-gray-700 mb-2">
                            Select your winner:
                        </label>
                        <select
                            id="winner-pick"
                            value={winnerPick?.id || ''}
                            onChange={handleWinnerPickChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm 
                                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Choose a survivor...</option>
                            {activeSurvivors.map(survivor => (
                                <option key={survivor.id} value={survivor.id}>
                                    {survivor.survivor.first_name} {survivor.survivor.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {winnerPick?.survivor && (
                        <div className="flex justify-center">
                            <div className="details-card-container">
                                <SurvivorLogCard survivorLog={winnerPick} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Favorites Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Favorite Survivors</h3>
                        <FavoriteSurvivorLogForm
                            existingFavorites={favoriteSurvivors}
                            onFavoriteAdded={getAndSetFavorites}
                        />
                    </div>

                    {favoriteSurvivors.length > 0 ? (
                        <div className="flex flex-wrap gap-6 justify-center">
                            {favoriteSurvivors.map(favorite => (
                                <div key={favorite.id} className="details-card-container">
                                    <SurvivorLogCard 
                                        survivorLog={favorite.survivor_log}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No favorite survivors selected yet.</p>
                    )}
                </div>
            </div>
        </div>
    )

}