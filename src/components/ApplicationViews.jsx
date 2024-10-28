import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Authorized } from "./Authorized"
import Home from "../pages/Home"
import { SeasonLogsList } from "./season-logs/SeasonLogsList"
import { NavBar } from "./Navbar"

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
                        <Route path="/seasons" element={<SeasonLogsList />}>
                            <Route path="survivors" element={<>test!</>}/>
                        </Route>
                    </Route>
                </Routes>
        </div>
    )
}