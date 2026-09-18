import { api } from "../../../api/client";
import type { EmailRequest,LoginRequest,ResetPasswordRequest,SignupRequest } from "../contracts/authRequests";
export function login(request: LoginRequest) { return api.post(
                "/auth/login",
                request
            ); }

export function signup(request: SignupRequest) { return api.post(
                "/auth/signup",
                request
            ); }

export function requestPasswordReset(request: EmailRequest) { return api.post(
                "/auth/forgot-password",
                request
            ); }

export function requestAccountVerification(request: EmailRequest) { return api.post(
                "/auth/verify-account",
                request
            ); }

export function resetPassword(request: ResetPasswordRequest) { return api.post(
                    "/verify-token",
                    request
            ); }

export function verifyToken(endpoint: string, token: string | null) { return api.post(
                    endpoint,
                    {
                        token,
                    }
                ); }

export function getCurrentUser() { return api.get("/auth/me"); }

export function logoutSession() { return api.post(
                "/auth/logout"
            ); }
