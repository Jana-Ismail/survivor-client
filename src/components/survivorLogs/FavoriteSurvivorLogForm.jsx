import { useState } from "react"
import { useSeasonContext } from "../../context/seasonContext"
import { SurvivorLogCard } from "./SurvivorLogCard"
import { addFavoriteSurvivor } from "../../dataManagers/survivorLogs"

export const FavoriteSurvivorLogForm = ({existingFavorites, onFavoriteAdded}) => {
    const { survivorLogs, seasonLog } = useSeasonContext()
    const [isAdding, setIsAdding] = useState(false)

    const availableSurvivors = survivorLogs.filter(
        survivor => !existingFavorites.some(
            fav => fav.survivor_log.id === survivor.id
        )
    )

    const handleAddFavorite = async (survivorLog) => {
        if (survivorLog?.id && seasonLog?.id) {
            await addFavoriteSurvivor(seasonLog.id, survivorLog.id)
            onFavoriteAdded()
            setIsAdding(false)
        }
    }

    if (!isAdding) {
        return (
            <button
                onClick={() => setIsAdding(true)}
                className="button button-primary mb-4"
            >
                Add Favorite Survivor
            </button>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
                <div className="fixed inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal content */}
                <div className="inline-block w-full max-w-4xl my-8 p-6 bg-white rounded-lg shadow-xl text-left align-middle">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Select a Survivor to Add</h3>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="button button-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                    
                    {availableSurvivors.length > 0 ? (
                        <div className="survivor-cards-grid">
                            {availableSurvivors.map(survivorLog => (
                                <div 
                                    key={survivorLog.id} 
                                    className="survivor-card-wrapper cursor-pointer hover:opacity-75"
                                    onClick={() => handleAddFavorite(survivorLog)}
                                >
                                    <SurvivorLogCard survivorLog={survivorLog} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No more survivors available to add as favorites.</p>
                    )}
                </div>
            </div>
        </div>
    ) 
}