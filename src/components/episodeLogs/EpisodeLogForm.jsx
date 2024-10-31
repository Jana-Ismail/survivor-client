import { useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import './EpisodeLogs.css'
import { createEpisodeLog } from '../../dataManagers/episodeLogs';
import { useEffect, useState } from 'react';
import { useSeasonContext } from '../../context/seasonContext';

export const EpisodeLogForm = () => {
  const navigate = useNavigate();
  const { seasonLog, refreshSeasonLog, activeSurvivors} = useSeasonContext()
  
  const [episodeNumber, setEpisodeNumber] = useState(1)
  const [episodeData, setEpisodeData] = useState({})
  
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
    if (activeSurvivors.length > 0) {
      const initialEpisodeData = activeSurvivors.reduce((acc, survivor) => ({
        ...acc,
        [survivor.survivor.id]: columns.reduce((colAcc, col) => ({
          ...colAcc,
          [col.id]: false
        }), {})
      }), {});

      setEpisodeData(initialEpisodeData);    
    }
  }, [activeSurvivors])
  
  const handleCheckboxChange = (survivorId, columnId) => {
    setEpisodeData(prev => ({
      ...prev,
      [survivorId]: {
        ...prev[survivorId],
        [columnId]: !prev[survivorId][columnId]
      }
    }))
  }

  const transformFormData = () => {
    const episodeLogData = {
      season_log: seasonLog.id,
      episode_number: parseInt(episodeNumber),
      survivor_actions: Object.entries(episodeData)
        .map(([survivorLogId, actions]) => {
          const checkedActions = Object.entries(actions)
            .filter(([_, isChecked]) => isChecked)
            .map(([actionKey, _]) => actionKey)

          if (checkedActions.length > 0) {
            return {
              survivor_log: parseInt(survivorLogId),
              actions: checkedActions
            }
          }
          return null
        })
        .filter(Boolean)
      }

      return episodeLogData
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEpisodeLogData = transformFormData()

    createEpisodeLog(newEpisodeLogData).then(() => {
      refreshSeasonLog()
      navigate(`/season-logs/${seasonLog.id}/episodes`)
    })

  }

  return (
    <div className="episode-form-card">
      <div className="episode-form-header">
        <h2 className="episode-form-title">New Episode Log</h2>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-6">
          <label htmlFor="episodeNumber" className="block text-sm font-medium text-gray-700">
            Episode Number
          </label>
          <input
            id="episodeNumber"
            type="number"
            min="1"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            className="episode-number-input"
          />
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
              {activeSurvivors?.map(survivor => (
                <tr key={survivor.id}>
                  <td className="font-medium">
                    {survivor.survivor.name}
                  </td>
                  {columns.map(column => (
                    <td key={column.id} className="text-center">
                      <input
                        type="checkbox"
                        checked={episodeData[survivor.id]?.[column.id] || false}
                        onChange={() => handleCheckboxChange(survivor.id, column.id)}
                        className="episode-checkbox"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="button-container">
          <button 
            type="button" 
            className="button button-secondary"
            onClick={() => navigate(`/season-logs/${seasonLog.id}/episodes`)}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="button button-primary"
          >
            Save Episode Log
          </button>
        </div>
      </form>
    </div>
  )
}