import { createContext, useContext, useState, useCallback } from 'react'
import { getSeasonLogById } from '../dataManagers/seasonLogs'
import { getSurvivorLogs } from '../dataManagers/survivorLogs'
import { createSurvivorNote, deleteSurvivorNote, editSurvivorNote, getNotesBySurvivorLogId } from '../dataManagers/survivorNotes'

const SeasonContext = createContext()

export const SeasonProvider = ({ children }) => {
    const [seasonLog, setSeasonLog] = useState(null)
    const [survivorLogs, setSurvivorLogs] = useState([])
    const [survivorNotes, setSurvivorNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const loadSeasonData = useCallback(async (seasonLogId) => {
        setIsLoading(true)
        try {
            const seasonLogData = await getSeasonLogById(seasonLogId)
            if (seasonLogData) {
                setSeasonLog(seasonLogData)
                const survivorLogData = await getSurvivorLogs(seasonLogData.id)
                setSurvivorLogs(survivorLogData)
            }
        } catch (error) {
            console.error('Error loading season data:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const loadSurvivorNotes = useCallback(async (seasonLogId, survivorLogId) => {
        try {
            const notesData = await getNotesBySurvivorLogId(seasonLogId, survivorLogId)
            setSurvivorNotes(notesData || [])
        } catch (error) {
            console.error('Error loading survivor notes:', error)
        }
    }, [])

    const addNote = useCallback(async (seasonLogId, survivorLogId, noteText) => {
        try {
            const result = await createSurvivorNote(seasonLogId, survivorLogId, {text: noteText})
            if (result) {
                await loadSurvivorNotes(seasonLogId, survivorLogId)
            }
        } catch (error) {
            console.error('Error adding note:', error)
        }
    }, [loadSurvivorNotes])
    
    const updateNote = useCallback(async (seasonLogId, survivorLogId, note) => {
        try {
          const result = await editSurvivorNote(seasonLogId, survivorLogId, note)
          if (result) {
            await loadSurvivorNotes(seasonLogId, survivorLogId)
          }
        } catch (error) {
          console.error('Error updating note:', error)
        }
      }, [loadSurvivorNotes])
    
    const removeNote = useCallback(async (seasonLogId, survivorLogId, note) => {
        try {
            await deleteSurvivorNote(seasonLogId, survivorLogId, note)
            await loadSurvivorNotes(seasonLogId, survivorLogId)
        } catch (error) {
            console.error('Error deleting note:', error)
        }
    }, [loadSurvivorNotes])

    const getSurvivorLog = useCallback((survivorLogId) => {
        return survivorLogs.find(survivor => survivor.id === parseInt(survivorLogId))
    }, [survivorLogs])
    
    const refreshSeasonLog = useCallback(async () => {
        if (!seasonLog?.id) return
        
        setIsLoading(true)

        try {
          const seasonLogData = await getSeasonLogById(seasonLog.id)
          if (seasonLogData) {
            setSeasonLog(seasonLogData)
            const survivorLogData = await getSurvivorLogs(seasonLogData.id)
            setSurvivorLogs(survivorLogData)
          }
        } catch (error) {
          console.error('Error refreshing season data:', error)
        } finally {
          setIsLoading(false)
        }
    }, [seasonLog?.id])

    const contextValue = {
        seasonLog,
        survivorLogs,
        isLoading,
        loadSeasonData,
        refreshSeasonLog,
        activeSurvivors: survivorLogs.filter(survivor => survivor.is_active),
        survivorNotes,
        loadSurvivorNotes,
        addNote,
        updateNote,
        removeNote,
        getSurvivorLog
    }
    
    return (
        <SeasonContext.Provider value={contextValue}>
            {children}
        </SeasonContext.Provider>
    )
}

export const useSeasonContext = () => {
    const context = useContext(SeasonContext)
    if (!context) {
        throw new Error('useSeasonContext must be used within a SeasonProvider')
    }
    return context
}