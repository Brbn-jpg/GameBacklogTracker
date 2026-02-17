import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const logout = useCallback(() => {
    Cookies.remove("jwt_token");
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const fetchUser = useCallback(async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else if (response.status === 401 || response.status === 403) {
        logout();
      } else {
        console.error(
          "Failed to fetch user due to server error:",
          response.status
        );
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch user due to network error:", error);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      fetchUser(token);
    } else {
      setAuthLoading(false);
    }
  }, [fetchUser]);

  const login = (token, rememberMe) => {
    if (rememberMe) {
      Cookies.set("jwt_token", token, { expires: 4 });
    } else {
      Cookies.set("jwt_token", token);
    }
    setIsAuthenticated(true);
    fetchUser(token);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic animate-pulse">
          Initializing...
        </h1>
        <div className="w-full max-w-md h-8 border-4 border-black p-1">
          <div className="h-full bg-yellow-400 w-full animate-[loading_1.5s_ease-in-out_infinite_alternate]"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        token: Cookies.get("jwt_token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
