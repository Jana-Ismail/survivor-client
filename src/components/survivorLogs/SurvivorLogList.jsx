import { useEffect, useState } from "react"
import { getSurvivorLogs } from "../../dataManagers/survivorLogs"
import { Link } from "react-router-dom"

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
        <>
            <h3>Survivor Cards Here</h3>
            {survivorLogs.map((survivor) => {
                return (
                    <Link to={`/survivor-log/${seasonLog.id}/survivors/${survivor.id}`} key={survivor.id}>
                        <div>{survivor.survivor.first_name}</div>
                    </Link>
                )
            })}
        </>
    )
}