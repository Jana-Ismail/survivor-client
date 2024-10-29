import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/Navbar.jsx"
import { useAppContext } from "../context/state.jsx"

export const Authorized = () => {
    const { token } = useAppContext()
  if (token) {
    return <>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
