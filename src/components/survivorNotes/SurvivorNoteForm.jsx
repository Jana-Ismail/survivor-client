import { useRef } from "react"
import { useParams } from "react-router-dom"
import { useSeasonContext } from "../../context/seasonContext"

export const SurvivorNoteForm = () => {
    const { seasonLogId, survivorLogId } = useParams()
    const { addNote } = useSeasonContext()
    const note = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const noteText = note.current.value
        if (!noteText) return // Don't submit empty notes

        addNote(seasonLogId, survivorLogId, noteText)
        
        note.current.value = ""
    }
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="w-full p-3 border rounded-md min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add notes about this survivor..."
                ref={note}
            />
            <button type="submit">ADD NOTE</button>
        </form>
    )
}