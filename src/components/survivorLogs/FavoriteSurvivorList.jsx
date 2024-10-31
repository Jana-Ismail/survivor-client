import { useSeasonContext } from "../../context/seasonContext"

export const FavoriteSurvivorList = () => {
    const { seasonLog, survivorLogs } = useSeasonContext()
    
    return (
        <div>
            <h3>Favorite Survivors for Season {seasonLog.season.season_number}</h3>
            {/* Favorites list implementation will go here */}
        </div>
    )
}