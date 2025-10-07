import handleError from "../../hooks/errorHandler";
import axiosInstance from "../axiosInstance";
export const createRoom = async (roomName) => {
  try {
    const res = await axiosInstance.post("/rooms", {
      roomName: roomName,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
export const getRoom = async (roomId) => {
  try {
    const res = await axiosInstance.get(`/rooms/${roomId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
