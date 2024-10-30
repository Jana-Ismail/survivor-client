import { useEffect, useState } from "react"
import { getNotesBySurvivorLogId } from "../../dataManagers/survivorNotes"
import { useParams } from "react-router-dom"

export const SurvivorNotesList = () => {
    const [notes, setNotes] = useState([])
    const { seasonLogId, survivorLogId} = useParams()

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

    return (
        <div>
            {notes.map((note) => {
                return <div>{note.text}</div>
            })}
        </div>
    )
}