import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      fetchUser(token);
    } else {
      setAuthLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/v1/users/me", {
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
  };

  const login = (token, rememberMe) => {
    if (rememberMe) {
      Cookies.set("jwt_token", token, { expires: 4 });
    } else {
      Cookies.set("jwt_token", token);
    }
    setIsAuthenticated(true);
    fetchUser(token);
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Wczytywanie sesji...
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
