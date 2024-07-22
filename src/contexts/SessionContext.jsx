import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        removeToken();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      removeToken();
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
    setIsAuthenticated(false);
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        setToken,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
