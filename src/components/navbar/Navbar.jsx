import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useAppContext } from "../../context/state"

export const NavBar = () => {
    const { token, setToken } = useAppContext()
    const navigate = useNavigate()
    
    return (
        <ul className="navbar pb-10">
            <li className="navbar__item">
                <NavLink 
                    className="text-blue-600 hover:text-purple-700 underline"
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            {token ?
                <>
                    <li className="navbar__item pl-10">
                        <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/season-logs"}>Seasons</NavLink>
                    </li>
                    <li className="navbar__item">
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("token")
                                setToken("")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> 
                </> :
                    <>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        
        </ul>
    )
}