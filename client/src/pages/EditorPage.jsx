import { useEffect } from "react"
import CodeEditor from "../components/CodeEditor"
import { useSocket } from "../contexts/SocketContext"
import { socket } from "../socket"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
const EditorPage = () => {
    const {activeRoom} = useRoomContext()
    const { isConnected } = useSocket()
    const {user} = useAuthContext() 
    const {onlineUsers} = useSocket()
    useEffect(() => {
        console.log(isConnected)
        if(!isConnected){
            socket.auth = {roomId:activeRoom,user:user}
            socket.connect()
        }
    }, [])
    return (
        <div>
            <CodeEditor onlineUsers={onlineUsers} />
        </div>
    )
}
export default EditorPage