import handleError from "../../hooks/errorHandler";
import axiosInstance from "../axiosInstance";
export const createRoom = async (roomName) => {
  try {
    const res = await axiosInstance.post("/rooms", {
      roomName: roomName,
    });
    return res.data
  } catch (error) {
    handleError(error);
  }
};
