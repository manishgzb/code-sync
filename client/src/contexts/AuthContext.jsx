import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("code-sync-token") || "";
  });
  const [user, setUser] = useState(() => {
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.user;
    }
    return "";
  });

  const [isError, setIsError] = useState('')
  const login = async (username, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: username,
        password: password
      })
      localStorage.setItem("code-sync-token", res.data.token);
      setToken(res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
      return res.status
    } catch (err) {
      if (err.response) {
        setIsError(err.response.data.message)
      } else if (err.request) {
        setIsError('No response from server')
      } else {
        setIsError(err.message)
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("code-sync-token");
    setToken("");
    setUser("");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, token, isError }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => {
  return useContext(AuthContext);
};
