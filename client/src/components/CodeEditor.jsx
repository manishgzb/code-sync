import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef, useMemo } from "react";
import TabButton from "./TabButton";
import extensionMap from "../assets/extensionMap";
import { socket } from "../socket";
import { debounce } from "../utils";
import { useAuthContext } from "../contexts/AuthContext";

function CodeEditor({ activeFileId, activeFile, setFiles }) {
  // State variables
  const { user } = useAuthContext()

  const debouncedSocketEmit = useMemo(() =>
    debounce((value) => {
      setFiles((prevFiles) => {
        return prevFiles.map((file) => file._id === activeFileId ? { ...file, content: value } : file)
      })
      socket.emit("file:code-update", { ...activeFile, content: value })
    }, 300)
    , [activeFile, activeFileId])



  // Editor events handlers

  const handleEditorChange = (value, event) => {
    socket.emit('user:typing', user)
    debouncedSocketEmit(value)
  }

  return (
      <div className="w-full">
        {activeFileId && (
            <Editor
              height="90vh"
              theme="vs-dark"
              path={activeFile?._id}
              defaultLanguage={activeFile ? extensionMap[activeFile.language].language : "javascript"}
              value={activeFile?.content || ""}
              onChange={handleEditorChange}
            />
        )}
      </div>
  );
}
export default CodeEditor;
