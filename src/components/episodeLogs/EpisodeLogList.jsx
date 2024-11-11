import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSeasonContext } from "../../context/seasonContext"
import { getEpisodeLogs } from "../../dataManagers/episodeLogs"

// Simple checkmark component
const Checkmark = () => (
    <span className="checkmark">✓</span>
)

export const EpisodeLogList = () => {
    const { seasonLog, survivorLogs } = useSeasonContext()
    // const [episodeLogs, setEpisodeLogs] = useState([])
    const [episodeData, setEpisodeData] = useState({
        episode_logs: [],
        next_episode: 1,
        total_episodes: 0
    })
    const [isLoading, setIsLoading] = useState(true)

    const columns = [
        { id: 'found_idol', label: 'Found Idol' },
        { id: 'played_idol', label: 'Played Idol' },
        { id: 'won_reward', label: 'Won Reward' },
        { id: 'won_immunity', label: 'Won Immunity' },
        { id: 'is_individual_immunity', label: 'Individual Immunity' },
        { id: 'found_advantage', label: 'Found Advantage' },
        { id: 'voted_out', label: 'Voted Out' }
    ]

    useEffect(() => {
        if (seasonLog?.id) {
            setIsLoading(true)
            getEpisodeLogs(seasonLog.id)
                .then(data => {
                    if (data) {
                        setEpisodeData(data)
                    }
                    // if (data?.episode_logs) {
                    //     setEpisodeLogs(data.episode_logs)
                    // }
                })
                .finally(() => setIsLoading(false))
        }
    }, [seasonLog?.id])

    // Helper function to get survivors active during a specific episode
    const getSurvivorsForEpisode = (episodeNumber) => {
        return survivorLogs.filter(survivor => {
            return survivorLogs.filter(survivor => {
                survivor.is_active ||
                (survivor.episode_voted_out && survivor.episode_voted_out >= episodeNumber)
            })
        })
    }

    if (isLoading) {
        return <div className="text-center p-4">Loading episode logs...</div>
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3>Episodes for Season {seasonLog.season.season_number}</h3>
                <Link 
                    to={`/season-logs/${seasonLog.id}/episodes/create`}
                    className="button button-primary"
                    state={{ 
                        next_episode: episodeData.next_episode,
                        total_episodes: episodeData.total_episodes
                    }}
                >
                    Add Episode Log
                </Link>
            </div>

            {episodeData.episode_logs.map(episodeLog => {
                const episodeSurvivors = getSurvivorsForEpisode(episodeLog.episode.episode_number)
                
                return (
                <div key={episodeLog.id} className="episode-form-card mb-6">
                    <div className="episode-form-header">
                        <h2 className="episode-form-title">
                            Episode {episodeLog.episode.episode_number}
                            {episodeLog.episode.title && `: ${episodeLog.episode.title}`}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="episode-table">
                            <thead>
                                <tr>
                                    <th>Survivor</th>
                                    {columns.map(column => (
                                        <th key={column.id} className="text-center">
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {episodeSurvivors.map(survivor => {
                                    const foundIdols = episodeLog.found_idols.some(
                                        idol => idol.survivor_log.id === survivor.id
                                    )
                                    const playedIdols = episodeLog.played_idols.some(
                                        idol => idol.survivor_log.id === survivor.id
                                    )
                                    const wonRewards = episodeLog.won_rewards.some(
                                        reward => reward.survivor_log.id === survivor.id
                                    )
                                    const wonImmunities = episodeLog.won_immunities.some(
                                        immunity => immunity.survivor_log.id === survivor.id
                                    )
                                    const foundAdvantages = episodeLog.found_advantages.some(
                                        advantage => advantage.survivor_log.id === survivor.id
                                    )

                                    return (
                                        <tr key={survivor.id}>
                                            <td className="font-medium">
                                                {`${survivor.survivor.first_name} ${survivor.survivor.last_name}`}
                                            </td>
                                            <td className="text-center">
                                                {foundIdols && <Checkmark />}
                                            </td>
                                            <td className="text-center">
                                                {playedIdols && <Checkmark />}
                                            </td>
                                            <td className="text-center">
                                                {wonRewards && <Checkmark />}
                                            </td>
                                            <td className="text-center">
                                                {wonImmunities && <Checkmark />}
                                            </td>
                                            <td className="text-center">
                                                {/* Individual immunity check */}
                                            </td>
                                            <td className="text-center">
                                                {foundAdvantages && <Checkmark />}
                                            </td>
                                            <td className="text-center">
                                                {survivor.episode_voted_out === episodeLog.episode.episode_number && 
                                                    <Checkmark />}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )})}
        </div>
    )
}