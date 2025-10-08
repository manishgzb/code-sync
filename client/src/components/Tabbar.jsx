import TabButton from "./TabButton"
const Tabbar = ({ openFiles, setOpenFiles, setActiveFileId, files }) => {
    return (
        <>
            <div class Name="tab-bar flex w-full overflow-x-auto 
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