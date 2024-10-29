import { useEffect, useState } from "react"
import { getSurvivorLogs } from "../../dataManagers/survivorLogs"
import { Link } from "react-router-dom"
import { SurvivorLogCard } from "./SurvivorLogCard"

export const SurvivorLogList = ({ seasonLog }) => {
    const [survivorLogs, setSurvivorLogs] = useState([])
    
    const getAndSetSurvivorLogs = () => {
        getSurvivorLogs(seasonLog.id).then((survivorLogData) => {
            setSurvivorLogs(survivorLogData)
        })
    }

    useEffect(() => {
        getAndSetSurvivorLogs()
    }, [])

    return(
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Survivor Cards</h2>
            <div className="survivor-grid">
                {survivorLogs.map((survivorLog) => (
                    <Link 
                        to={`/season-logs/${seasonLog.id}/survivors/${survivorLog.id}`} 
                        key={survivorLog.id}
                        state={{ survivorLog, seasonLog }}
                    >
                        <SurvivorLogCard survivorLog={survivorLog} />
                    </Link>
                ))}
            </div>
        </div>
    )
}