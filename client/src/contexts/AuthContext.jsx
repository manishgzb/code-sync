import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const [user, setUser] = useState(() => {
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.user;
    }
    return "";
  });
  const login = (username, password) => {
    axiosInstance
      .post("/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        const decoded = jwtDecode(res.data.token);
        setUser(decoded.user);
      })
      .catch((err) => {
        console.log("Login failed");
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser("");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => {
  return useContext(AuthContext);
};
