import { useState } from "react"
import Button from "../components/Button"
import RoomForm from "../components/JoinRoomForm"
import { socket } from "../socket"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../contexts/SocketContext"
import axiosInstance from "../api/axiosInstance"
import { createRoom as createRoomService } from "../api/services/roomServices"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Room from "../components/WelcomeUser"
import WelcomeUser from "../components/WelcomeUser"
import JoinRoomForm from "../components/JoinRoomForm"

const RoomPage = () => {

    return (
        <>
        <Header/>
        <WelcomeUser/>
        <Footer/>
        </>
    )
}
export default RoomPage