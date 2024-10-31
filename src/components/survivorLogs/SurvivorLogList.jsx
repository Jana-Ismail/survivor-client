import { useEffect, useState } from "react"
import { getSurvivorLogs } from "../../dataManagers/survivorLogs"
import { Link, useOutletContext } from "react-router-dom"
import { SurvivorLogCard } from "./SurvivorLogCard"
import { useSeasonContext } from "../../context/seasonContext"

export const SurvivorLogList = () => {
    const { seasonLog, survivorLogs } = useSeasonContext()
    

    return(
        <div className="p-4">
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