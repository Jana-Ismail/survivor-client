import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/state'
import { ApplicationViews } from './views/ApplicationViews'
// import './App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ApplicationViews />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
