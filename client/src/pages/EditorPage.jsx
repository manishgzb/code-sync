import { useEffect, useState, useMemo } from "react"
import CodeEditor from "../components/CodeEditor"
import { useSocket } from "../contexts/SocketContext"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"
import { getFiles, updateFile } from "../api/services/fileServices"
import Sidebar from "../components/Sidebar"
import Tabbar from "../components/Tabbar"
import PresenceList from "../components/PresenceList"
import { socket } from "../socket"
import { ToastContainer,toast } from "react-toastify"
const EditorPage = () => {
    const { activeRoom } = useRoomContext()
    const { user } = useAuthContext()
    const [files, setFiles] = useState([])
    const [activeFileId, setActiveFileId] = useState("");
    const activeFile = useMemo(() => {
        return files.find((file) => file._id === activeFileId) || null;
    }, [files, activeFileId])
    const [openFiles, setOpenFiles] = useState([]);
    const { onlineUsers, updatedFile, isFileCreated, deletedFile,isConnected } = useSocket()

    useEffect(() => {
        console.log(isConnected)
        if (!isConnected) {
            socket.auth = { roomId: activeRoom, user: user }
            socket.connect()
        }
        return(()=>{
            socket.disconnect()
        })
    }, [])
    // effect to fetch all files for room
    useEffect(() => {
        const fetchFiles = async () => {
            const files = await getFiles(activeRoom)
            setFiles(files)
        }
        fetchFiles()
    }, [isFileCreated, deletedFile])
    // effect to sync activeFile when it changes
    useEffect(() => {
        const stillActive = openFiles.find((fileId) => fileId === activeFileId)
        if (!stillActive) {
            setActiveFileId(openFiles[0] || '')
        }
    }, [openFiles, activeFileId]);

    //update openfiles state when a file deleted
    useEffect(() => {
        if (!deletedFile) return
        setOpenFiles((prevFiles) => prevFiles.filter((tab) => tab != deletedFile._id));
    }, [deletedFile])


    return (
        <div className="flex flex-row w-full h-screen">
            <ToastContainer position="top-center"/>
            <Sidebar
                files={files}
                setActiveFileId={setActiveFileId}
                setTabs={setOpenFiles}
            />
            <div className="flex w-6/7">
                <div className="flex flex-col w-7/8">
                    <Tabbar openFiles={openFiles}
                        files={files}
                        setOpenFiles={setOpenFiles}
                        setActiveFileId={setActiveFileId} />
                    <CodeEditor activeFileId={activeFileId}
                        activeFile={activeFile}
                        files={files}
                        setFiles={setFiles} />
                </div>
                <div className="w-1/8">
                    <PresenceList users={onlineUsers} />
                </div>
            </div>
        </div>
    )
}
export default EditorPage