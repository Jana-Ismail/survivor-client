import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"
import { useAppContext } from "../context/state.jsx"

export const Authorized = () => {
    const { token } = useAppContext()
  if (token) {
    return <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
