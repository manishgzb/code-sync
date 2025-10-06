import { useState } from "react";
import extensionMap from "../assets/extensionMap";
import { deleteFile as deleteFileService, updateFile as updateFileService } from "../api/services/fileServices"
import { socket } from "../socket";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
const File = ({ file, setActiveFileId, setTabs }) => {
    // state variables
    const [showMenu, setShowMenu] = useState(false)
    const [showMenuButton, setShowMenuButton] = useState(false)
    const handleOpenMenuClick = (e) => {
        e.stopPropagation()
        setShowMenu((prev) => !prev)


    }
    const { user } = useAuthContext()
    // helper functions
    const deleteFile = async () => {
        try {
            const resData = await deleteFileService(file._id)
        } catch (err) {
            toast(err.message, {
                type: 'error'
            })
        }
    }

    const saveFile = () => {

    }
    const renameFile = () => {

    }



    // event handlers
    const handleDeleteClick = async () => {
        await deleteFile()
        setTabs((prevTabs) => prevTabs.filter((tab) => tab != file._id));
        socket.emit("file:delete", user, file)
    }

    const handleRenameClick = () => {

    }

    const handleSaveClick = () => {

    }
    return (
        <div
            onClick={() => {
                setTabs((prev) => {
                    const exist = prev.find((fileId) => fileId === file._id)
                    if (!exist) {
                        return [...prev, file._id]
                    }
                    return prev
                })
                setActiveFileId(file._id)
            }}
            onMouseOver={() => setShowMenuButton(true)}
            onMouseLeave={() => setShowMenuButton(false)}
            className="px-1 flex gap-1 items-center relative hover:bg-gray-200 hover:shadow-sm hover:cursor-pointer"
        >
            <div className="w-2/10">
                <img
                    className="h-4 w-4"
                    src={extensionMap[file.language] ? extensionMap[file.language].icon : ""}
                    alt=""
                />
            </div>
            <div className="w-8/10 flex items-center justify-between">
                <div>
                    <p className="text-sm text-left">{file.name}</p>
                </div>
                {
                    showMenuButton && <div onClick={handleOpenMenuClick}>
                        <img
                            className="h-3 w-3"
                            src="https://img.icons8.com/?size=100&id=102729&format=png&color=000000"
                            alt=""
                        />
                    </div>
                }

                {showMenu && <div className="absolute left-32 top-4 z-50" onMouseLeave={() => {
                    setShowMenu(false)
                }}>
                    <ul className="menu menu-sm bg-base-200 rounded-box w-56 flex">
                        <li><button onClick={handleRenameClick} className="btn btn-xs mt-1">Rename</button></li>
                        <li><button onClick={handleDeleteClick} className="btn btn-xs mt-1">Delete</button></li>
                        <li><button onClick={handleSaveClick} className="btn btn-xs mt-1">Save</button></li>
                    </ul>
                </div>}
            </div>
        </div>
    );
};
export default File;
