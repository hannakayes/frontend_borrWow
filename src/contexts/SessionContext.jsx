import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName"); // Remove userName from localStorage
  };

  const fetchUserData = async () => {
    if (!token || !userId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserName(data.username); // Set userName from response
        window.localStorage.setItem("userName", data.username); // Save userName to localStorage
      } else {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      removeToken();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setToken(tokenToVerify);
        setUserId(data.userId);
        setIsAuthenticated(true);
        fetchUserData(); // Fetch user data after verifying the token
      } else {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error in verifyToken:", error);
      removeToken();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    if (localToken) {
      const localUserName = window.localStorage.getItem("userName");
      setUserName(localUserName); // Set userName from localStorage
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token);
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUserId(null);
    setUserName(null); // Clear userName on logout
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        userId,
        userName, // Add userName to context value
        setToken,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
