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
function CodeEditor({ activeFileId, activeFile, setFiles, files }) {
  const viewRef = useRef(null)
  const editorRef = useRef(null)
  const ydoc = useMemo(() => new Y.Doc(), [])
  const yfiles = useMemo(() => ydoc.getMap('yfiles'), [])
  const awareness = useMemo(() => new Awareness(ydoc), [])
  const provider = useMemo(() => new SocketIoProvider('room1', awareness, ydoc, socket), [])
  const langcompartment = useMemo(() => new Compartment(), [])


  useEffect(() => {
    if (!editorRef.current || !activeFileId) return
    if (!yfiles) return
    if (!yfiles.has(activeFileId)) {
      yfiles.set(activeFileId, new Y.Text(activeFile?.content || ""))
    }
    const ytext = yfiles.get(activeFileId)
    const startState = EditorState.create({
      doc: ytext.toString(),
      extensions: [basicSetup, langcompartment.of(javascript()), yCollab(ytext, provider.awareness)]
    })
    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current
    })
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy(),
          viewRef.current = null
      }
    }
  }, [activeFileId, yfiles])


  // side effect to change editor language when activeFile changes
  useEffect(() => {
    if (!activeFile) return
    const ext = activeFile.name.split('.').pop()
    const lang = extensionMap[ext].language
    viewRef.current?.dispatch({ effects: langcompartment.reconfigure(lang) })
  }, [activeFile])

  //
  useEffect(() => {
    if (!files) return
    files.forEach((file) => {
      if (!yfiles.has(file._id)) {
        yfiles.set(file._id, new Y.Text(file.content))
      }
    })
  }, [files])
  return (

    <div ref={editorRef} className='w-full h-screen'>
    </div>
  );
}
export default CodeEditor;
