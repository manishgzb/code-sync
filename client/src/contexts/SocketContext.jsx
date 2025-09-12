import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket";
export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [updatedFile, setUpdatedFile] = useState(null)
    const [isFileCreated, setIsFileCreated] = useState(0)
    const [isFileDeleted, setIsFileDeleted] = useState(0)
    useEffect(() => {
        function onConnect() {
            console.log("socket connected")
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }
        function onFileUpdated(file) {
            console.log(file.content)
            setUpdatedFile(file)
            // socket.auth.serverOffset = serverOffset;
        }
        function onFileCreated() {
            setIsFileCreated(prev => prev + 1)
        }
        function onFileDeleted() {
            setIsFileDeleted(prev => prev + 1)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('file:code-updated', onFileUpdated)
        socket.on('file:deleted', onFileDeleted)
        socket.on("file:created", onFileCreated)
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('file:code-updated', onFileUpdated)
            socket.off("file:created", onFileCreated)
            socket.off("file:deleted", onFileDeleted)
        }
    },[])
    return (
        <SocketContext.Provider
            value={{
                isConnected,
                updatedFile,
                isFileDeleted,
                isFileCreated
            }}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketContextProvider

export const useSocket = () => {
    return useContext(SocketContext)
}

