import { api } from "../../../api/client";

import type {
  ChangeEmailRequest,
  ChangeNameRequest,
  ChangePasswordRequest,
} from "../types/accountTypes";

export async function changeName(request: ChangeNameRequest): Promise<void> {
  await api.post("/auth/user/update-name", request);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("activity-history-invalidated"));
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<void> {
  await api.post("/auth/user/update-password", request);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("activity-history-invalidated"));
}

export async function changeEmail(request: ChangeEmailRequest): Promise<void> {
  await api.post("/auth/user/update-email", request);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("activity-history-invalidated"));
}
