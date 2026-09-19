import { createContext } from "react";

import type { AuthUser } from "../contracts/authContracts";

type AuthContextType = {
  user: AuthUser | null;

  loading: boolean;

  isLoggedIn: boolean;

  refreshAuth: () => Promise<void>;

  logout: () => Promise<void>;

  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
