import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "./contexts/AuthContext.jsx"
import { jwtDecode } from "jwt-decode"
function App() {
  const { token, logout } = useAuthContext()
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      const currTime = Date.now() / 1000
      if(!currTime<decoded.exp){
        console.log('token expired')
        logout()
      }
    }
  }, [])
  return (
    <div>
      
      <Outlet />
    </div>
  )
}

export default App
