import {
    createContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

import { api } from "../api/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type AuthUser = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    verified: boolean;
    verifiedAt: string | null;
    createdAt: string;
};


type AuthContextType = {

    user: AuthUser | null;

    loading: boolean;

    isLoggedIn: boolean;

    refreshAuth: () => Promise<void>;

    logout: () => Promise<void>;

    clearAuth: () => void;
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

    const navigate = useNavigate();


    async function refreshAuth() {

        try {

            const response =
                await api.get("/auth/me");


            if (!isAuthUser(response.data)) {

                setUser(null);
                return;
            }


            console.log(
                "AuthContext: refreshAuth: user is logged in:",
                response.data
            );


            setUser(response.data);

            localStorage.setItem(
                "wasLoggedIn",
                "true"
            );


        } catch (error) {

            const wasLoggedIn =
                localStorage.getItem("wasLoggedIn") === "true";


            if (
                axios.isAxiosError(error) &&
                (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) &&
                wasLoggedIn
            ) {

                alert(
                    "Sorry, your session has timed out. Please log in again."
                );

                localStorage.removeItem(
                    "wasLoggedIn"
                );
            }


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

            localStorage.removeItem(
                "wasLoggedIn"
            );

            navigate(
                "/auth/login"
            );
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
                clearAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );


    function isAuthUser(
        value: unknown
    ): value is AuthUser {

        if (
            typeof value !== "object" ||
            value === null
        ) {
            return false;
        }


        const user =
            value as Partial<AuthUser>;


        return (
            typeof user.id === "number" &&

            typeof user.email === "string" &&

            typeof user.firstName === "string" &&

            typeof user.lastName === "string" &&

            typeof user.role === "string" &&

            typeof user.verified === "boolean" &&

            (
                user.verifiedAt === null ||
                typeof user.verifiedAt === "string"
            ) &&

            typeof user.createdAt === "string"
        );
    }

    function clearAuth() {

    setUser(null);

    localStorage.removeItem(
        "wasLoggedIn"
    );
}
}