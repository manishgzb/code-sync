import extensionMap from "../assets/extensionMap";
const TabButton = ({ fileId,setActiveFileId, setTabs }) => {
  return (
    <div
      className="flex items-center justify-between gap-2 p-2 
        border-r-1 border-t-1 border-b-1 border-gray-300 dark:bg-w hover:bg-gray-100 cursor-pointer"
    >
      <div
        className="flex items-center gap-2"
        onClick={() => {
          setActiveFileId(fileId);
        }}
      >
        <div>
          <img
            className="w-5 h-5"
            src="https://img.icons8.com/?size=100&id=20909&format=png&color=000000"
            alt=""
          />
        </div>
        <div className="text-md font-semibold">
          <p>{fileId}</p>
        </div>
      </div>
      <div
        className="hover:cursor-default"
        onClick={() => {
          setTabs((prevTabs) => prevTabs.filter((tab) => tab != fileId));
        }}
      >
        <img
          className="w-5 h-5"
          src={
            "https://img.icons8.com/?size=100&id=6483&format=png&color=000000"
          }
          alt=""
        />
      </div>
    </div>
  );
};
export default TabButton;
