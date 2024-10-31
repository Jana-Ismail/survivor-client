import { useEffect, useState } from "react"
import { getNotesBySurvivorLogId, editSurvivorNote, deleteSurvivorNote } from "../../dataManagers/survivorNotes"
import { useParams } from "react-router-dom"
import { useSeasonContext } from "../../context/seasonContext"

export const SurvivorNotesList = () => {
    const { seasonLogId, survivorLogId } = useParams()
    const { survivorNotes, updateNote, removeNote } = useSeasonContext()
    const [editNoteId, setEditNoteId] = useState(0)
    const [editText, setEditText] = useState("")

    const handleEdit = (note) => {
        setEditNoteId(note.id)
        setEditText(note.text)
    }

    const handleSave = (note) => {
        const updatedNote = { ...note, text: editText }
        updateNote(seasonLogId, survivorLogId, updatedNote)
        setEditNoteId(0)
    }

    const handleDelete = (note) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            removeNote(seasonLogId, survivorLogId, note)
        }
    }

    const handleCancel = () => {
        setEditNoteId(0)
        setEditText("")
    }

    return (
        <div className="space-y-4 mt-4">
            {survivorNotes?.map((note) => (
                <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                    {editNoteId === note.id ? (
                        <div className="space-y-2">
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full p-3 border rounded-md min-h-[100px] focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleSave(note)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start">
                            <div className="whitespace-pre-wrap">{note.text}</div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEdit(note)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(note)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}