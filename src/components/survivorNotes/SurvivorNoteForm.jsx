import { useRef } from "react"
import { createSurvivorNote } from "../../dataManagers/survivorNotes"

export const SurvivorNoteForm = ({ survivorLog, seasonLogId, getAndSetNotes }) => {
    const note = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const noteText = note.current.value
        if (!noteText) return // Don't submit empty notes

        const newNote = {
            text: noteText
        }

        createSurvivorNote(
            seasonLogId,
            survivorLog.id,
            newNote
        ).then((data) => {
            if (data) {
                note.current.value=""
                getAndSetNotes()
            }
        })
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="w-full p-3 border rounded-md min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add notes about this survivor..."
                ref={note}
            />
            <button>ADD NOTE</button>
        </form>
    )
}