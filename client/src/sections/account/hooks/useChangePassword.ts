import axios from "axios";
import { useState } from "react";
import { isValidPassword } from "../utils/isValidPassword";

import { changePassword } from "../api/accountApi";

import type { ChangePasswordFormData } from "../types/accountTypes";

interface UseChangePasswordOptions {
  passwordMismatchMessage: string;
  weakPasswordMessage: string;
  incorrectPasswordMessage: string;
  genericErrorMessage: string;
}

export function useChangePassword({
  passwordMismatchMessage,
  weakPasswordMessage,
  incorrectPasswordMessage,
  genericErrorMessage,
}: UseChangePasswordOptions) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const submit = async (form: ChangePasswordFormData): Promise<boolean> => {
    setError(null);
    setSuccess(false);

    if (form.newPassword !== form.confirmPassword) {
      setError(passwordMismatchMessage);

      return false;
    }

    if (!isValidPassword(form.newPassword)) {
      setError(weakPasswordMessage);

      return false;
    }

    setLoading(true);

    try {
      await changePassword({
        currentPassword: form.currentPassword,

        newPassword: form.newPassword,
      });

      setSuccess(true);

      return true;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(incorrectPasswordMessage);
      } else {
        setError(genericErrorMessage);
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
    success,
  };
}
