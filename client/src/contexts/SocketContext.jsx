import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket";
export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [updatedFile, setUpdatedFile] = useState(null)
    const [isFileCreated, setIsFileCreated] = useState(0)
    const [isFileDeleted, setIsFileDeleted] = useState(0)
    const [onlineUsers, setOnlineUser] = useState([])
    useEffect(() => {
        function onConnect() {
            console.log("socket connected")
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }
        function onFileUpdated(file) {
            setUpdatedFile(file)
            // socket.auth.serverOffset = serverOffset;
        }
        function onFileCreated() {
            setIsFileCreated(prev => prev + 1)
        }
        function onFileDeleted() {
            setIsFileDeleted(prev => prev + 1)
        }
        function onUserTyping(user) {
            console.log(`${user.name} is typing`)
        }
        function onRoomUsers(users) {
            const uniqueUsers = Array.from(
                new Map(users.map(user => [user.id, user])).values()
            );
            setOnlineUser((prev) => {
                return [...uniqueUsers]
            })
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('file:code-updated', onFileUpdated)
        socket.on('file:deleted', onFileDeleted)
        socket.on("file:created", onFileCreated)
        socket.on("user:typing", onUserTyping)
        socket.on("room:users", onRoomUsers)
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('file:code-updated', onFileUpdated)
            socket.off("file:created", onFileCreated)
            socket.off("file:deleted", onFileDeleted)
            socket.off("user:typing", onUserTyping)
            socket.off("room:users", onRoomUsers)

        }
    }, [])
    return (
        <SocketContext.Provider
            value={{
                isConnected,
                updatedFile,
                isFileDeleted,
                isFileCreated,
                onlineUsers
            }}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketContextProvider

export const useSocket = () => {
    return useContext(SocketContext)
}

