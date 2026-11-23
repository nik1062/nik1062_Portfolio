import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // In a real app, you might want to verify the token with the backend here
      setUser({ isAdmin: true }); 
    }
    setLoading(false);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
    setUser({ isAdmin: true });
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
