import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";
export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [updatedFile, setUpdatedFile] = useState(null)
    const [isFileCreated, setIsFileCreated] = useState(0)
    const [deletedFile, setdeletedFile] = useState(null)
    const [onlineUsers, setOnlineUser] = useState([])
    const {user} = useAuthContext()
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
        function onFileCreated(usr, newFile) {
            setIsFileCreated(prev => prev + 1)
            if (usr.id === user.id) {
                return toast(`${newFile} created`, {
                    type: 'success'
                })
            }
            toast(`${usr.name} created ${newFile}`, {
                type: 'info'
            })
        }
        function onFileDeleted(usr, file) {
            setdeletedFile(file)
            if (usr.id === user.id) {
                return toast(`File ${file.name} deleted`,{
                    type:'success'
                })
            }
            toast(`${usr.name} deleted file ${file.name}`,{
                type:'info'
            })
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
    }, [user])
    return (
        <SocketContext.Provider
            value={{
                isConnected,
                updatedFile,
                deletedFile,
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

