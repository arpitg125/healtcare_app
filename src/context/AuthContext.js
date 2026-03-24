import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const MOCK_USER = { email: "doctor@hospital.com", name: "Doctor" };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // Restore session from localStorage
    const saved = localStorage.getItem("hc_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthError("");
    // Mock credentials check
    if (email === "doctor@hospital.com" && password === "password123") {
      localStorage.setItem("hc_user", JSON.stringify(MOCK_USER));
      setUser(MOCK_USER);
      return true;
    } else {
      setAuthError("Invalid email or password. Use demo credentials below.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("hc_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, authError, login, logout, setAuthError }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
