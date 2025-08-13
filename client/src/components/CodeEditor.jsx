import Editor from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import TabButton from './TabButton'
function CodeEditor() {
    const [filename,setFileName] = useState("script.js")
    const editorRef = useRef(null)
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
    }
    return (
        <div className='flex'>
            <div className='sidebar w-1/6'>Side bar</div>
            <div className='editor-tab-container w-5/6'>
                <div className='tabs-container flex'>
                    <TabButton/>
                    <button className='btn' onClick={(e)=>setFileName("index.js")}>index.html</button>
                    <button className='btn' onClick={(e)=>setFileName("style.css")}>style.css</button>
                </div>
                <div className='editor-container'>
                    <Editor
                        height="80vh"
                        theme="vs-dark"
                        path={filename}
                        defaultLanguage="javascript"
                        defaultValue={filename}
                        onMount={(editor) => (editorRef.current = editor)}
                    />
                </div>
            </div>
        </div>
    )
}
export default CodeEditor