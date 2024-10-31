import { NavLink, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AuthContext"

export const NavBar = () => {
    const { token, setToken } = useAppContext()
    const navigate = useNavigate()
    
    const linkStyles = "text-gray-200 hover:text-white font-medium transition-colors duration-200"
    const activeLinkStyles = "text-white font-semibold"
    
    return (
        <nav className="bg-gray-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex space-x-8">
                        <NavLink 
                            to="/"
                            className={({ isActive }) => 
                                isActive ? activeLinkStyles : linkStyles
                            }
                        >
                            Home
                        </NavLink>
                        {token && (
                            <NavLink 
                                to="/season-logs"
                                className={linkStyles}
                            >
                                Seasons
                            </NavLink>
                        )}
                    </div>
                    
                    <div className="flex space-x-8">
                        {token ? (
                            <button 
                                className={`${linkStyles} hover:text-red-300`}
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    setToken("")
                                    navigate('/login')
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink 
                                    to="/login"
                                    className={({ isActive }) => 
                                        isActive ? activeLinkStyles : linkStyles
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/register"
                                    className={({ isActive }) => 
                                        isActive ? activeLinkStyles : linkStyles
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}