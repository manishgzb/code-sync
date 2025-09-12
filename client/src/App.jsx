import { useEffect, useState } from "react"
import CodeEditor from "./components/CodeEditor"
import { socket } from "./socket.js"
import RoomPage from "./pages/RoomPage.jsx"
import { Outlet } from "react-router-dom"
import { useSocket } from "./contexts/SocketContext.jsx"
function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
