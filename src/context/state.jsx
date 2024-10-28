import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("")
    // const [profile, setProfile] = useState({})
    
    useEffect(() => {
        setToken(localStorage.getItem('token'))
      }, [])
    
    useEffect(() => {
        const authRoutes = ['/login', '/register']
        if (token) {
          localStorage.setItem('token', token)
        
        // Keeping this commented in case I decide to 
        // set a profile for the draft
        
        //   if (!authRoutes.includes(router.pathname)) {
        //     getUserProfile().then((profileData) => {
        //       if (profileData) {
        //         setProfile(profileData)
        //       }
        //     })
        //   }
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
