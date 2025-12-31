import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return; // ✅ DO NOTHING if token missing

    try {
      const decoded = jwtDecode(token); // ✅ only decode valid token
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token, clearing storage");
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
