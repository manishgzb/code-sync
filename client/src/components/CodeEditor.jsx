import Editor from "@monaco-editor/react";
import { lazy, useEffect, useRef, useState } from "react";
import TabButton from "./TabButton";
import extensionMap from "../assets/extensionMap";
import { socket } from "../socket";
function CodeEditor() {
  const [tabs, setTabs] = useState([
    "index.html",
    "script.js",
    "style.css",
    "data.json",
  ]);
  const [filename, setFileName] = useState(tabs[0]);

  useEffect(() => {
    if (!tabs.includes(filename)) {
      setFileName(tabs[0] || "");
    }
  }, [tabs, filename]);

  return (
    <div className="flex p-6 h-screen">
      <div className="sidebar w-1/7 border-1 p-2 border-gray-300">
        <div className="border-1 border-gray-300">
          <h1>Explorer</h1>
          <button className="btn" onClick={() => socket.connect()}>
            Connect
          </button>
        </div>
        <div>
          <p>Room1</p>
        </div>
      </div>
      <div className="editor-tab-container w-6/7">
        <div className="tabs-container flex">
          {tabs.map((tab, index) => (
            <TabButton
              key={Date.now() + index}
              tabname={tab}
              setFileName={setFileName}
              setTabs={setTabs}
              filename={filename}
            />
          ))}
        </div>
        {filename && (
          <div className="editor-container">
            <Editor
              height="90vh"
              theme="vs-dark"
              path={filename}
              language={extensionMap[filename.split(".")[1]].language}
              value={filename}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default CodeEditor;
