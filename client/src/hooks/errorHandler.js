const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message);
  } else if (error.request) {
    throw new Error("No response from server");
  } else {
    throw new Error(error.message);
  }
};
export default handleError
