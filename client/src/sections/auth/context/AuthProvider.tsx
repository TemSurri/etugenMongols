import { useCallback, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, logoutSession } from "../api/authApi";
import type { AuthUser } from "../contracts/authContracts";
import { isAuthUser } from "../contracts/authGuards";
import { AuthContext } from "./authContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/client";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const refreshAuth = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      if (!isAuthUser(response.data)) {
        setUser(null);
        return;
      }

      setUser(response.data);

      localStorage.setItem("wasLoggedIn", "true");
    } catch (error) {
      const wasLoggedIn = localStorage.getItem("wasLoggedIn") === "true";

      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403) &&
        wasLoggedIn
      ) {
        alert("Sorry, your session has timed out. Please log in again.");

        localStorage.removeItem("wasLoggedIn");
      }

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function logout() {
    try {
      await logoutSession();
    } finally {
      setUser(null);

      localStorage.removeItem("wasLoggedIn");

      navigate("/auth/login");
    }
  }

  // Runs when the frontend first loads / refreshes.
  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/csrf");

        api.defaults.headers.common["X-XSRF-TOKEN"] = response.data.token;
      } catch (error) {
        console.error("Failed to initialize CSRF token", error);
      }

      await refreshAuth();
    };

    initialize();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        isLoggedIn: user !== null,

        refreshAuth,
        logout,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  function clearAuth() {
    setUser(null);

    localStorage.removeItem("wasLoggedIn");
  }
}
