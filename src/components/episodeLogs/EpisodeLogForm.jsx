import { useLocation, useNavigate } from 'react-router-dom'
import './EpisodeLogs.css'
import { createEpisodeLog } from '../../dataManagers/episodeLogs';
import { useEffect, useState } from 'react';
import { useSeasonContext } from '../../context/seasonContext';

export const EpisodeLogForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { seasonLog, refreshSeasonLog, activeSurvivors} = useSeasonContext()
  
  const nextEpisode = location.state?.next_episode || 1
  const maxEpisodes = location.state?.total_episodes || 1

  const [episodeNumber, setEpisodeNumber] = useState(nextEpisode)
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

  // useEffect(() => {
  //   if (episodeLogs) {
  //     setEpisodeNumber(episodeLogs.next_episode)
  //     setMaxEpisodes(episodeLogs.total_episodes)
  //   }
  // }, [episodeLogs])

  // useEffect(() => {
  //   if (episodeLogs) {
  //     setMaxEpisodes(episodeLogs.total_episodes)
  //     setNextEpisode(episodeLogs.nextEpisode)
  //   }
  // }, [episodeLogs])

  useEffect(() => {
    if (activeSurvivors.length > 0) {
      const initialEpisodeData = activeSurvivors.reduce((acc, survivor) => ({
        ...acc,
        [survivor.id]: columns.reduce((colAcc, col) => ({
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
      episode_number: parseInt(episodeNumber),
      survivor_logs: Object.entries(episodeData)
        .map(([survivorLogId, actions]) => {
          const checkedActions = Object.entries(actions)
            .reduce((acc, [actionKey, isChecked]) => {
              if (isChecked) {
                acc[actionKey] = true
              }
              return acc
            }, {})

          // Only include survivors that have at least one action checked
          if (Object.keys(checkedActions).length > 0) {
            return {
              id: parseInt(survivorLogId),
              episode_actions: checkedActions
            }
          }
          return null
        })
        .filter(Boolean) // remove null entries
      }

      return episodeLogData
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEpisodeLogData = transformFormData()

    createEpisodeLog(seasonLog.id, newEpisodeLogData).then((data) => {
      if (data) {
        refreshSeasonLog()
        navigate(`/season-logs/${seasonLog.id}/episodes`)
      }
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
            Episode {episodeNumber} of {maxEpisodes}
          </label>
          <input
            id="episodeNumber"
            type="number"
            min={episodeNumber}
            max={maxEpisodes}
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(parseInt(e.target.value))}
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
                    {survivor.survivor.first_name}
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