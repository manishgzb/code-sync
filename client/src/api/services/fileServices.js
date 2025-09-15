import axiosInstance from "../axiosInstance";
export const createFile = async (filename,roomId) => {
  try {
    const response = await axiosInstance.post("/files", {
      name: filename,
      roomId: roomId,
      language: filename.split(".")[1]
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};
export const deleteFile = async (fileId) => {
  try {
    const response = await axiosInstance.delete(`/files/${fileId}`);
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};
export const updateFile = async (fileId, name, content, language) => {
  try {
    const response = await axiosInstance.put(`/files/${fileId}`, {
      name: name,
      content: content,
      language: language,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};
export const getFile = async (fileId) => {
  try {
    const response = await axiosInstance.get(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};
export const getFiles = async (roomId) => {
  try {
    const response = await axiosInstance.get(`/rooms/${roomId}/files`);
    return response.data.files;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};
