import { useEffect, useState } from "react"
import CodeEditor from "./components/CodeEditor"
import {socket} from "./socket.js"
function App() {
  const [isConnected,setIsConnected] = useState(socket.connected)
  const [updatedFile,setFileUpdated] = useState(null)
  useEffect(()=>{
    function onConnect(){
      setIsConnected(true)
    }
    function onDisconnect(){
      setIsConnected(false)
    }
    function onCodeUpdate(file){
     setFileUpdated(file)
    }
    socket.on('connect',onConnect)
    socket.on('disconnect',onDisconnect)
    socket.on('file:code-updated',onCodeUpdate)
    return ()=>{
      socket.off('connect',onConnect)
      socket.off('disconnect',onDisconnect)
      socket.off('file:code-updated',onCodeUpdate)
    }
  })
  return (
    <CodeEditor updatedFile={updatedFile} />
  )
}

export default App
