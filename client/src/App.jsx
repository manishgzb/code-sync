import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "./contexts/AuthContext.jsx"
import { jwtDecode } from "jwt-decode"
import axiosInstance from "./api/axiosInstance.js"
function App() {
  const { token, logout } = useAuthContext()
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      const currTime = Date.now() / 1000
      if (currTime > decoded.exp) {
        logout()
      }
    }
  }, [])
  useEffect(() => {
    const awakeServer = async () => {
      const res = await axiosInstance.post("/ping")
    }
    awakeServer()
  }, [])
  return (
    <div>

      <Outlet />
    </div>
  )
}

export default App
