import { useEffect, useState } from "react"
import CodeEditor from "./components/CodeEditor"
import { socket } from "./socket.js"
import RoomPage from "./pages/RoomPage.jsx"
import { Outlet } from "react-router-dom"
import { useSocket } from "./contexts/SocketContext.jsx"
import { useAuthContext } from "./contexts/AuthContext.jsx"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
function App() {
  const { token, logout } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      const currTime = Date.now() / 1000
      if(currTime<decoded.exp){
        navigate("/room")
      }else{
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
