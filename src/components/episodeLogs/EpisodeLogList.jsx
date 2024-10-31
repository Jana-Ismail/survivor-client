import { Link } from "react-router-dom"
import { useSeasonContext } from "../../context/seasonContext";

export const EpisodeLogList = () => {
    const { seasonLog, survivorLogs } = useSeasonContext()

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3>Episodes for Season {seasonLog.season.season_number}</h3>
                <Link 
                    to={`/season-logs/${seasonLog.id}/episodes/create`}
                    state={{ survivorLogs }}
                    className="button button-primary"
                >
                    Add Episode Log
                </Link>
            </div>
            {/* Episode list implementation will go here */}
        </div>
    )

}