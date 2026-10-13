export type ActivityKind = "EMAIL_CHANGE" | "ACCOUNT_VERIFICATION" | "PASSWORD_CHANGE" | "LOGIN" | "DONATION" | "REGISTRATION" | (string & {});
export type ActivityStatus = "STARTED" | "SUCCESS" | "FAILED" | (string & {});
export type HistoryCategory = "account" | "participation";

export interface ActivityDTO {
  id: string;
  type: ActivityKind;
  description: string;
  status: ActivityStatus;
  createdAt: string;
}

export interface HistoryCursor {
  cursorTime: string;
  cursorId: string;
}

export interface ActivityHistoryResponse {
  activities: ActivityDTO[];
  nextCursorTime: string | null;
  nextCursorId: string | null;
}
