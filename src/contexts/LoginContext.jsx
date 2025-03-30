import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import axios from "axios";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate(); // ✅ Use this

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:4000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      });
    }
  }, [token]);

  const login = async (empID, password) => {
    try {
      console.log("Sending credentials:", { empID, password });

      const response = await axios.post("http://localhost:4000/auth/login", { empID, password });
      setUser({ empID, role: response.data.role });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/profile"); // ✅ Use this to navigate after login
    } catch (error) {
      console.error("Login failed", error.response.data);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login"); // ✅ Use this to navigate after logout
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, token }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
