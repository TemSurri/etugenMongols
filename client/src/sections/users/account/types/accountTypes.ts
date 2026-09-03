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

export interface UserHistoryItem {

    type: string;

    title: string;

    description: string;

    status: string | null;

    createdAt: string;

    resource: string | null;

    operation: string | null;

    field: string | null;

    oldValue: string | null;

    newValue: string | null;
}

export interface UserHistoryPage {
    content: UserHistoryItem[];

    totalElements: number;
    totalPages: number;

    size: number;
    number: number;

    first: boolean;
    last: boolean;

    numberOfElements: number;
    empty: boolean;
}