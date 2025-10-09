import { useEffect, useState, useMemo } from "react"
import CodeEditor from "../components/CodeEditor"
import { useSocket } from "../contexts/SocketContext"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"
import { getFiles } from "../api/services/fileServices"
import Sidebar from "../components/Sidebar"
import Tabbar from "../components/Tabbar"
import PresenceList from "../components/PresenceList"
import { socket } from "../socket"
import { ToastContainer, toast } from "react-toastify"
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness.js';
import { getRandomHexColor } from '../utils';
import { useNavigate } from "react-router-dom"

const EditorPage = () => {
    const navigate = useNavigate()
    const { activeRoom } = useRoomContext()
    const { user } = useAuthContext()
    const [files, setFiles] = useState([])
    const [activeFileId, setActiveFileId] = useState("");
    const activeFile = useMemo(() => {
        return files.find((file) => file._id === activeFileId) || null;
    }, [files, activeFileId])
    const [openFiles, setOpenFiles] = useState([]);
    const { onlineUsers, isFileCreated, deletedFile, isConnected } = useSocket()
    const ydoc = useMemo(() => new Y.Doc(), [])
    const yfiles = useMemo(() => ydoc.getMap('yfiles'), [])
    const awareness = useMemo(() => {
        const awareness = new Awareness(ydoc)
        awareness.setLocalStateField('user', {
            name: user.name,
            color: getRandomHexColor()
        })
        return awareness
    }, [])


    const leaveRoom = () => {
        socket.emit('leave-room')
        awareness.setLocalState(null)
        navigate("/room")
    }

    useEffect(() => {
        if (!isConnected) {
            socket.auth = { roomId: activeRoom, user: user }
            socket.connect()
        }
        return (() => {
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
            <ToastContainer position="top-center" />
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
                        activeFileId={activeFileId}
                        setActiveFileId={setActiveFileId} />
                    <CodeEditor activeFileId={activeFileId}
                        activeFile={activeFile}
                        ydoc={ydoc}
                        yfiles={yfiles}
                        awareness={awareness}
                    />
                </div>
                <div className="lg:w-1/8 w-50">
                    <PresenceList users={onlineUsers} leaveRoom={leaveRoom} />
                </div>
            </div>
        </div>
    )
}
export default EditorPage