import type { AuthUser } from "./authContracts";

/** The provider's existing acceptance rule, shared with focused boundary tests. */
export function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === "number" &&
    typeof user.email === "string" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.role === "string" &&
    typeof user.verified === "boolean" &&
    (user.verifiedAt === null || typeof user.verifiedAt === "string") &&
    typeof user.createdAt === "string"
  );
}
