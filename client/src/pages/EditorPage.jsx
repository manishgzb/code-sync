import { useEffect, useState } from "react"
import CodeEditor from "../components/CodeEditor"
import { useSocket } from "../contexts/SocketContext"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"
import { getFiles, updateFile } from "../api/services/fileServices"
import Sidebar from "../components/Sidebar"
import Tabbar from "../components/Tabbar"
import PresenceList from "../components/PresenceList"
const EditorPage = () => {
    const { activeRoom } = useRoomContext()
    const { user } = useAuthContext()
    const [files, setFiles] = useState([])
    const [activeFile, setActiveFile] = useState(null)
    const [activeFileId, setActiveFileId] = useState("");
    const [openFiles, setOpenFiles] = useState([]);
    const {onlineUsers, updatedFile, isFileCreated, isFileDeleted } = useSocket()

    // useEffect(() => {
    //     console.log(isConnected)
    //     if (!isConnected) {
    //         socket.auth = { roomId: activeRoom, user: user }
    //         socket.connect()
    //     }
    //     return(()=>{
    //         socket.disconnect()
    //     })
    // }, [])
    // effect to fetch all files for room
    useEffect(() => {
        const fetchFiles = async () => {
            const files = await getFiles(activeRoom)
            setFiles(files)
        }
        fetchFiles()
    }, [isFileCreated, isFileDeleted])
    // effect to sync activeFile when it changes
    useEffect(() => {
        const stillActive = openFiles.find((fileId) => fileId === activeFileId)
        if (!stillActive) {
            setActiveFileId(openFiles[0] || '')
        }
    }, [openFiles, activeFileId]);

    // effect to handle ctrl+s event
    useEffect(() => {
        const saveFile = async () => {
            if (!activeFile) return
            try {
                const res = await updateFile(activeFile._id, activeFile.name, activeFile.content, activeFile.language)
                window.alert(res.message)
            } catch (err) {
                window.alert(err)
            }
        }
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault()
                saveFile()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeFile])
    
    useEffect(() => {
        if (!files || !activeFileId) return
        const file = files.find((file) => file._id === activeFileId)
        setActiveFile(file)
    }, [activeFileId, files])

    useEffect(() => {
        if (!updatedFile) return
        console.log('updatedFile',updatedFile)
        setFiles((prevFiles) => {
            return prevFiles.map((file) => file._id === updatedFile._id ? { ...file, content: updatedFile.content } : file)
        })
    }, [updatedFile])


    useEffect(() => {
        console.log(onlineUsers)
    }, [onlineUsers])
    return (
        <div className="flex flex-row w-full h-screen">
            <Sidebar
                files={files}
                setActiveFileId={setActiveFileId}
                setTabs={setOpenFiles}
            />
            <div className="flex w-6/7">
                <div className="flex flex-col w-7/8">
                    <Tabbar openFiles={openFiles}
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