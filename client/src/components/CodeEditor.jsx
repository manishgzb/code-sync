import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import extensionMap from '../assets/extensionMap';
import { socket } from '../socket';
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state';
import { EditorView } from 'codemirror';
import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next';
import { Awareness } from 'y-protocols/awareness.js';
import { SocketIoProvider } from '../SocketIoProvider';
import { javascript } from '@codemirror/lang-javascript';
import { Compartment } from '@codemirror/state';
import { useAuthContext } from '../contexts/AuthContext';
import { getRandomHexColor } from '../utils';
import { updateFile } from '../api/services/fileServices';
function CodeEditor({ activeFileId, activeFile, setFiles, files }) {
  const { user } = useAuthContext()
  const viewRef = useRef(null)
  const editorRef = useRef(null)
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
  const provider = useMemo(() => new SocketIoProvider('room1', awareness, ydoc, socket), [])
  const langcompartment = useMemo(() => new Compartment(), [])

  const ytextRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current || !activeFileId) return
    const setupEditor = () => {
      if (!editorRef.current) return
      if (!yfiles.has(activeFileId)) {
        yfiles.set(activeFileId, new Y.Text(activeFile?.content || ""))
      }
      const ytext = yfiles.get(activeFileId)
      ytextRef.current = ytext
      const startState = EditorState.create({
        doc: ytext.toString(),
        extensions: [basicSetup, langcompartment.of(javascript()), yCollab(ytext, provider.awareness)]
      })
      viewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current
      })
    }
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }
    if (provider.synced) {
      setupEditor()
    } else {
      provider.once('synced', setupEditor)
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy(),
          viewRef.current = null
      }
      provider.off('synced', setupEditor)
    }
  }, [activeFileId, activeFile, yfiles, provider, langcompartment, awareness])


  // side effect to change editor language when activeFile changes
  useEffect(() => {
    if (!activeFile) return
    const ext = activeFile.name.split('.').pop()
    const lang = extensionMap[ext].language
    viewRef.current?.dispatch({ effects: langcompartment.reconfigure(lang) })
  }, [activeFile])

  // effect to handle ctrl+s event
  useEffect(() => {
    const saveFile = async () => {
      if (!activeFileId) return
      try {
        const res = await updateFile(activeFile._id, activeFile.name, ytextRef.current.toString(), activeFile.language)
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
  }, [activeFileId, activeFile])
  return (

    <div ref={editorRef} className='w-full h-screen'>
    </div>
  );
}
export default CodeEditor;
