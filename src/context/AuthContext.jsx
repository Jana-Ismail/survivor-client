import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || "")

      useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
      }, [token])

      return (
        <AppContext.Provider value={{ token, setToken}}>
            {children}
        </AppContext.Provider>
      )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
