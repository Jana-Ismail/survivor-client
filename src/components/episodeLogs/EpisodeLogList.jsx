import { useOutletContext } from "react-router-dom"

export const EpisodeLogList = () => {
    const { seasonLog } = useOutletContext()
    
    return (
        <div>
            <h3>Episodes for Season {seasonLog.season.season_number}</h3>
            {/* Episode list implementation will go here */}
        </div>
    )
}