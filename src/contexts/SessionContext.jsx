import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Added userId state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.removeItem("authToken");
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
        const data = await response.json(); // Added to get userId
        setToken(tokenToVerify);
        setUserId(data.userId); // Store userId
        setIsAuthenticated(true);
      } else {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      removeToken();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUserId(null); // Clear userId on logout
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        userId, // Provide userId in context
        setToken,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
