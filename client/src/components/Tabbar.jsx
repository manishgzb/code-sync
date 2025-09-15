import TabButton from "./TabButton"
const Tabbar = ({ openFiles, setOpenFiles, setActiveFileId }) => {
    return (
        <>
            <div className="tab-bar flex w-full">
                {openFiles.map((fileId, index) => (
                    <TabButton
                        key={Date.now() + index}
                        fileId={fileId}
                        setActiveFileId={setActiveFileId}
                        setTabs={setOpenFiles}
                    />
                ))}
            </div>
        </>
    )
}
export default Tabbar