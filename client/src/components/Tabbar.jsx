import TabButton from "./TabButton"
const Tabbar = ({ openFiles, setOpenFiles,activeFileId, setActiveFileId, files }) => {
    return (
        <>
            <div className="scrollbar-thin tab-bar flex flex-row w-fit overflow-x-auto overflow-y-hidden 
            ">
                {openFiles.map((fileId, index) => (
                    <TabButton
                        key={Date.now() + index}
                        fileId={fileId}
                        setActiveFileId={setActiveFileId}
                        setTabs={setOpenFiles}
                        files={files}
                        activeFileId={activeFileId}
                    />
                ))}
            </div>
        </>
    )
}
export default Tabbar