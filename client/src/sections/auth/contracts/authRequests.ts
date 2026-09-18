export type LoginRequest = { email: string; password: string };
export type SignupRequest = { firstName: string; lastName: string; email: string; password: string };
export type EmailRequest = { email: string };
export type ResetPasswordRequest = { token: string; password: string };
export type VerifyTokenRequest = { token: string };
