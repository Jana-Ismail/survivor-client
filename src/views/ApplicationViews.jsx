import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "../components/seasonLogs/SeasonLogsList"
import { NavBar } from "../components/navbar/Navbar"
import { SeasonLogDetails } from "../components/seasonLogs/SeasonLogDetails"
import { SeasonLogForm } from "../components/seasonLogs/SeasonLogForm"
import { SurvivorLogDetails } from "../components/survivorLogs/SurvivorLogDetails"

export const ApplicationViews = () => {
    return (
        <div>
            <NavBar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<Authorized />}>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/season-logs"> 
                            <Route index element={<SeasonLogsList />} />
                            <Route path="create" element={<SeasonLogForm />} />
                            <Route path=":seasonLogId" >
                                <Route index element={<SeasonLogDetails />}/>
                                <Route path="survivors/:survivorId" element={<SurvivorLogDetails />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}