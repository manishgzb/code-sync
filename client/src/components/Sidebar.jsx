import { useState } from "react"
import File from "./File"
import { createFile } from "../api/services/fileServices"
import { socket } from "../socket"
import { useRoomContext } from "../contexts/RoomContext"
import { toast } from "react-toastify"
import {useAuthContext} from "../contexts/AuthContext"
import extensionMap from "../assets/extensionMap"
const Sidebar = ({ files, setActiveFileId, setTabs }) => {
    const { user } = useAuthContext()
    const [showInputBox, setShowInputBox] = useState(false)
    const [newFile, setNewFile] = useState('')
    const { activeRoom } = useRoomContext()
    const [globalMenuOpen,setGlobalMenuOpen] = useState(false)
    const createNewFile = async () => {
        try {
            const responseData = await createFile(newFile, activeRoom)
            socket.emit("file:create", user, newFile)
        } catch (err) {
            toast(err.message,{
                type:'error'
            })
        }
        setShowInputBox(false)
        setNewFile('')
    }
    const handleCreateFileEnter = async (e) => {
        if (e.key === 'Enter') {
            if(!extensionMap[newFile.split('.').pop()]){
                toast('Extension or language not supported',{
                    type:'error'
                })
                return
            }
            createNewFile()
        }
    }
    return (
        <div className="sidebar w-1/7 border-1 border-gray-300">
            <div className="flex h-10 border-b-1 border-gray-300 p-2 items-center justify-between">
                <h1 className="text-slate-700 text-lg font-semibold">Explorer</h1>

                <div onClick={() => setShowInputBox(true)}><img className="h-5 w-5 hover:cursor-pointer" src="https://img.icons8.com/?size=100&id=KTP9v004hvTf&format=png&color=000000" alt="" /></div>
            </div>
            <div>
                {
                    showInputBox && <input type="text" placeholder="Type here" className="input text-md h-6 focus:outline-none"
                        value={newFile}
                        onKeyDown={handleCreateFileEnter}
                        onChange={(e) => setNewFile(e.target.value)}
                    />
                }
            </div>
            <div className="files flex-col gap-2">
                {
                    files && files.map((file) => {
                        return <File key={file._id} file={file} setActiveFileId={setActiveFileId} setTabs={setTabs} globalMenuOpen={globalMenuOpen} setGlobalMenuOpen={setGlobalMenuOpen} />
                    })
                }

            </div>
        </div>
    )
}
export default Sidebar