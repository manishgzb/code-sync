import { createContext, useContext, useEffect, useState } from "react";

export const RoomContext = createContext()
const RoomContextProvider = ({ children }) => {
    const [activeRoom, setActiveRoom] = useState(localStorage.getItem('activeRoom') || '')
    return (
        <RoomContext.Provider value={{ activeRoom, setActiveRoom }}>
            {children}
        </RoomContext.Provider>
    )
}
export default RoomContextProvider
export const useRoomContext = () => {
    return useContext(RoomContext)
}