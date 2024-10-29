import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "../components/seasonLogs/SeasonLogsList"
import { NavBar } from "../components/navbar/Navbar"
import { SeasonLogDetail } from "../components/seasonLogs/SeasonLogDetail"
import { SeasonLogForm } from "../components/seasonLogs/SeasonLogForm"

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
                            <Route path=":seasonLogId" element={<SeasonLogDetail />}>
                                <Route path="survivors/:survivorId" element={<>Survivor Details and Notes here</>} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}