import { useRef } from "react"
import { createSurvivorNote } from "../../dataManagers/survivorNotes"

export const SurvivorNoteForm = ({ survivorLog, seasonLogId }) => {
    const note = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const noteText = note.current.value
        if (!note) return // Don't submit empty notes

        const newNote = {
            text: noteText
        }

        createSurvivorNote(
            seasonLogId,
            survivorLog.id,
            newNote
        )
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