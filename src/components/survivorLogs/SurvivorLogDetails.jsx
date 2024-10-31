import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SurvivorLogCard } from "./SurvivorLogCard"
import { SurvivorNotesList } from "../survivorNotes/SurvivorNotesList"
import { SurvivorNoteForm } from "../survivorNotes/SurvivorNoteForm"
import { getNotesBySurvivorLogId } from "../../dataManagers/survivorNotes"
import { useSeasonContext } from "../../context/seasonContext"

export const SurvivorLogDetails = () => {
    const navigate = useNavigate()
    const { seasonLogId, survivorLogId } = useParams()
    const {
        seasonLog,
        getSurvivorLog,
        survivorNotes,
        loadSurvivorNotes
    } = useSeasonContext()

    const survivorLog = getSurvivorLog(survivorLogId) 

    useEffect(() => {
        if (seasonLogId && survivorLogId) {
            loadSurvivorNotes(seasonLogId, survivorLogId)
        }
    }, [seasonLogId, survivorLogId, loadSurvivorNotes])

    if (!survivorLog) return <div>Loading...</div>

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
                <SurvivorNoteForm />
            </div>
            <div>
                <SurvivorNotesList />
            </div>
        </div>
    )
}
