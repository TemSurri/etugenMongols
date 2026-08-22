import {
    createContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

import { api } from "../api/client";


type AuthUser = {
    id: number;
    firstName: string;
    role: string;
};


type AuthContextType = {

    user: AuthUser | null;

    loading: boolean;

    isLoggedIn: boolean;

    refreshAuth: () => Promise<void>;

    logout: () => Promise<void>;
};


export const AuthContext =
    createContext<AuthContextType | null>(null);


export function AuthProvider({
    children
}: {
    children: ReactNode;
}) {

    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [loading, setLoading] =
        useState(true);


    async function refreshAuth() {

        try {

            const response =
                await api.get<AuthUser>(
                    "/auth/me"
                );

            setUser(response.data);

        } catch {

            setUser(null);

        } finally {

            setLoading(false);
        }
    }


    async function logout() {

        try {

            await api.post(
                "/auth/logout"
            );

        } finally {

            setUser(null);
        }
    }


    // Runs when the frontend first loads / refreshes.
    useEffect(() => {

        refreshAuth();

    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,

                isLoggedIn:
                    user !== null,

                refreshAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}