import TabButton from "./TabButton"
const Tabbar = ({ openFiles, setOpenFiles, setActiveFileId, files }) => {
    return (
        <>
            <div className="scrollbar-thin scrollbar-thumb-slate-300 tab-bar flex w-full overflow-x-auto overflow-y-hidden
            ">
                {openFiles.map((fileId, index) => (
                    <TabButton
                        key={Date.now() + index}
                        fileId={fileId}
                        setActiveFileId={setActiveFileId}
                        setTabs={setOpenFiles}
                        files={files}
                    />
                ))}
            </div>
        </>
    )
}
export default Tabbar