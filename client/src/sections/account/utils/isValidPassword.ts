/** Existing account-change policy; intentionally separate from auth form policies. */
export function isValidPassword(password: string): boolean {
  const hasMinLength = password.length >= 8;

  const hasUppercase = /[A-Z]/.test(password);

  const hasNumberOrSpecial = /[0-9]|[^A-Za-z0-9]/.test(password);

  return hasMinLength && hasUppercase && hasNumberOrSpecial;
}
