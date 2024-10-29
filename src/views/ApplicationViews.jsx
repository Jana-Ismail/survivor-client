import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "../components/season-logs/SeasonLogsList"
import { NavBar } from "../components/navbar/Navbar"
import { SeasonLogDetail } from "../components/season-logs/SeasonLogDetail"
import { SeasonLogForm } from "../components/season-logs/SeasonLogForm"

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
                            <Route path=":seasonLogId" element={<SeasonLogDetail />} />
                            <Route path="create" element={<SeasonLogForm />} />
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}