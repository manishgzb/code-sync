import handleError from "../../hooks/errorHandler";
import axiosInstance from "../axiosInstance";
export const createRoom = async (roomName,password) => {
  try {
    const res = await axiosInstance.post("/rooms", {
      roomName: roomName,
      password:password,
    });
    return res.data
  } catch (error) {
    handleError(error);
  }
};
