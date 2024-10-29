import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "./season-logs/SeasonLogsList"
import { NavBar } from "./Navbar"
import { SeasonLogDetail } from "./season-logs/SeasonLogDetail"

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
                            <Route path="create" element={<>Start a Season Log</>} />
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}