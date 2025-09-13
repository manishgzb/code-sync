import { useEffect } from "react"
import CodeEditor from "../components/CodeEditor"
import { useSocket } from "../contexts/SocketContext"
import { socket } from "../socket"
const EditorPage = () => {
    const { isConnected } = useSocket()
    useEffect(() => {
        console.log(isConnected)
        if(!isConnected){
            socket.auth = {roomId:'room1'}
            socket.connect()
        }
    }, [])
    return (
        <div>
            <CodeEditor />
        </div>
    )
}
export default EditorPage