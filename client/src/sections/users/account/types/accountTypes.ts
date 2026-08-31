export interface AccountUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    verified: boolean;
    verifiedAt: string | null;
    createdAt: string;
}

export interface ChangeNameRequest {
    firstName: string;
    lastName: string;
}

export interface ChangeNameFormData {
    firstName: string;
    lastName: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface ChangePasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangeEmailRequest {
    newEmail: string;
}

export interface ChangeEmailFormData {
    newEmail: string;
    confirmEmail: string;
}