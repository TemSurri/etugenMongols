export type AuthUser = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    verified: boolean;
    verifiedAt: string | null;
    createdAt: string;
};
