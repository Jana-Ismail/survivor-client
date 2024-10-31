import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "../components/seasonLogs/SeasonLogsList"
import { SurvivorLogList } from "../components/survivorLogs/SurvivorLogList"
import { NavBar } from "../components/navbar/Navbar"
import { SeasonLogDetails } from "../components/seasonLogs/SeasonLogDetails"
import { SeasonLogForm } from "../components/seasonLogs/SeasonLogForm"
import { SurvivorLogDetails } from "../components/survivorLogs/SurvivorLogDetails"
import { EpisodeLogForm } from "../components/episodeLogs/EpisodeLogForm"
import { EpisodeLogList } from "../components/episodeLogs/EpisodeLogList"
import { SeasonProvider } from "../context/seasonContext"
import { FavoriteSurvivorList } from "../components/survivorLogs/FavoriteSurvivorList"

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
                            <Route 
                                path=":seasonLogId"
                                element={
                                    <SeasonProvider>
                                        <SeasonLogDetails />
                                    </SeasonProvider>
                                }
                            >
                                <Route index element={<SurvivorLogList />} />
                                <Route path="episodes">
                                    <Route index element={<EpisodeLogList />} />
                                    <Route path="create" element={<EpisodeLogForm />} />
                                </Route>
                                <Route path="favorites" element={<FavoriteSurvivorList />} />
                                <Route path="survivors/:survivorLogId" element={<SurvivorLogDetails />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}