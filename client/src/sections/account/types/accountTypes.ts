export type { AuthUser as AccountUser } from "../../auth/contracts/authContracts";
export type {
  ChangeEmailRequest,
  ChangeNameRequest,
  ChangePasswordRequest,
  UserHistoryItem,
  UserHistoryPage,
} from "../contracts/accountContracts";

export interface ChangeNameFormData {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeEmailFormData {
  newEmail: string;
  confirmEmail: string;
}
