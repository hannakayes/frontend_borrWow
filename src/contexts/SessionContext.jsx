import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const removeToken = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
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
        console.log("Verify Token Response:", data); // Log the response
        setToken(tokenToVerify);
        setUserId(data.userId);
        setIsAuthenticated(true);
      } else {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error in verifyToken:", error);
      removeToken();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    const localUserId = window.localStorage.getItem("userId");
    if (localToken && localUserId) {
      setUserId(localUserId); // Make sure this is set correctly
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      window.localStorage.setItem("userId", userId); // Ensure this line is reached
      setIsAuthenticated(true);
    }
  }, [token, userId]);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setUserId(null);
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
        setToken,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
