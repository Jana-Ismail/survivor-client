import { useOutletContext } from "react-router-dom"

export const FavoriteSurvivorList = () => {
    const { seasonLog } = useOutletContext()
    
    return (
        <div>
            <h3>Favorite Survivors for Season {seasonLog.season.season_number}</h3>
            {/* Favorites list implementation will go here */}
        </div>
    )
}