import CodeMirror, { Compartment } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import extensionMap from '../assets/extensionMap';
import { socket } from '../socket';
import { debounce } from '../utils';
function CodeEditor({ activeFileId, activeFile, setFiles }) {
  const viewRef = useRef(null)
  const langcompartment = useMemo(() => new Compartment(), [])

  //

  const emitFileUpdate = useCallback((val) => {
    setFiles((prev) =>
      prev.map((file) => file._id === activeFileId ? { ...file, content: val } : file)
    )
    socket.emit("file:code-update", { ...activeFile, content: val })
  }, [activeFile, activeFileId])

  const debouncedEmitFileUpdate = useCallback(
    debounce(emitFileUpdate, 300)
    , [activeFile, activeFileId])


  // handling editor value change
  const onChange = useCallback((val, viewUpdate) => {
    debouncedEmitFileUpdate(val)

    //socket.emit("file:code-update", { ...activeFile, content: val })
  }, [activeFileId, activeFile])

  //side effect to change editor language when activeFile changes
  useEffect(() => {
    if (!activeFile) return
    const ext = activeFile.name.split('.').pop()
    const lang = extensionMap[ext].language
    viewRef.current?.dispatch({ effects: langcompartment.reconfigure(lang) })
  }, [activeFile])
  return (

    <div>
      {
        activeFile && activeFileId && <CodeMirror value={activeFile.content} height='540px' extensions={[langcompartment.of(javascript())]} onChange={onChange} onCreateEditor={(view, state) => viewRef.current = view} lang='' />
      }
    </div>
  );
}
export default CodeEditor;
