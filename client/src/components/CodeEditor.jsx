import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import TabButton from "./TabButton";
import extensionMap from "../assets/extensionMap";
import { socket } from "../socket";
import File from "./File";
import { createFile, getFiles, getFile, updateFile } from "../api/services/fileServices"

function CodeEditor({ updatedFile }) {
  // State variables
  const [showInputBox, setShowInputBox] = useState(false)
  const [files, setFiles] = useState([])
  const [newFile, setNewFile] = useState('')
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState("");
  const [activeFile, setActiveFile] = useState(null)
  // helper functions
  const createNewFile = async () => {
    try {
      const responseData = await createFile(newFile)
    } catch (err) {
      window.alert(err)
    }
    setShowInputBox(false)
    setNewFile('')
  }

  // Editor events handlers

  const handleEditorChange = (value, event) => {
    setFiles((prevFiles) => {
      return prevFiles.map((file) => file._id === activeFileId ? { ...file, content: value } : file)
    })
  }

  // Events handlers
  const handleCreateFileEnter = async (e) => {
    if (e.key === 'Enter') {
      createNewFile()
    }
  }
  // effect to sync activeFile when it changes
  useEffect(() => {
    const stillActive = openFiles.find((fileId) => fileId === activeFileId)
    if (!stillActive) {
      setActiveFileId(openFiles[0] || '')
    }
  }, [openFiles, activeFileId]);

  // effect to fetch all files for room
  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles("room1")
      setFiles(files)
    }
    fetchFiles()
  }, [showInputBox,updatedFile])

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
  
  // useEffect(() => {
  //   if (!updatedFile) return
  //   files.map((file)=>file._id === updatedFile._id ? {...file,content:updatedFile.content}:file)
  // }, [updatedFile])


  return (
    <div className="flex pt-1 h-screen">
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
              return <File key={file._id} file={file} setActiveFileId={setActiveFileId} setTabs={setOpenFiles} />
            })
          }

        </div>
      </div>
      <div className="editor-tab-container w-6/7">
        <div className="tabs-container flex">
          {openFiles.map((fileId, index) => (
            <TabButton
              key={Date.now() + index}
              fileId={fileId}
              setActiveFileId={setActiveFileId}
              setTabs={setOpenFiles}
            />
          ))}
        </div>
        {activeFileId && (
          <div className="editor-container">
            <Editor
              height="90vh"
              theme="vs-dark"
              path={activeFile?._id}
              defaultLanguage={activeFile ? extensionMap[activeFile.language].language : "javascript"}
              defaultValue={activeFile?.content || ""}
              onChange={handleEditorChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default CodeEditor;
