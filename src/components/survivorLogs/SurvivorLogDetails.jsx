import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SurvivorLogCard } from "./SurvivorLogCard"
import { SurvivorNotesList } from "../survivorNotes/SurvivorNotesList"
import { SurvivorNoteForm } from "../survivorNotes/SurvivorNoteForm"
import { getNotesBySurvivorLogId } from "../../dataManagers/survivorNotes"

export const SurvivorLogDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { seasonLogId, survivorLogId } = useParams()
    const [notes, setNotes] = useState([])

    // Get the survivor log from state or set to null if not available
    const [survivorLog, setSurvivorLog] = useState(location.state?.survivorLog || {})
    const seasonLog = location.state?.seasonLog
    
    const getAndSetNotes = () => {
        getNotesBySurvivorLogId(seasonLogId, survivorLogId).then((notesData) => {
            if (notesData) {
                setNotes(notesData)
            }
        })
    }

    useEffect(() => {
        getAndSetNotes()
    }, [survivorLogId])

    // useEffect(() => {
    //     if (!survivorLog && survivorLogId) {
    //         // fetch survivor log here
    //     }
    // }, [survivorLogId])

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <button 
                onClick={() => navigate(`/season-logs/${seasonLogId}`)}
                className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
            >
                ← Back to Season {seasonLog?.season?.season_number || ''} Survivors
            </button>

            {/* Top section with card and stats side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left side - Smaller Survivor Card */}
                <div className="details-card-container">
                    <SurvivorLogCard survivorLog={survivorLog} />
                </div>

                {/* Right side - Stats Section */}
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h2 className="text-2xl font-bold mb-4">Survivor Stats</h2>
                    <div className="space-y-4">
                        <div className="stat-group">
                            <h3 className="text-lg font-semibold mb-2">Game Status</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-label">Current Status:</span>
                                    <span className="stat-value">{survivorLog.is_active ? 'Active' : 'Inactive'}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Jury Member:</span>
                                    <span className="stat-value">{survivorLog.is_juror ? 'Yes' : 'No'}</span>
                                </div>
                                {survivorLog.episode_voted_out && (
                                    <div className="stat-item">
                                        <span className="stat-label">Voted Out:</span>
                                        <span className="stat-value">Episode {survivorLog.episode_voted_out}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Placeholder for additional stats */}
                        <div className="stat-group">
                            <h3 className="text-lg font-semibold mb-2">Challenge Performance</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-label">Individual Immunity Wins:</span>
                                    <span className="stat-value">0</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Reward Challenges Won:</span>
                                    <span className="stat-value">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section - Notes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Notes</h2>
                <SurvivorNoteForm 
                    survivorLog={survivorLog} 
                    seasonLogId={seasonLogId} 
                    getAndSetNotes={getAndSetNotes}
                />
            </div>
            <div>
                <SurvivorNotesList 
                    survivorLogId={survivorLogId} 
                    seasonLogId={seasonLogId}
                    notes={notes}
                    getAndSetNotes={getAndSetNotes}
                />
            </div>
        </div>
    )
}
