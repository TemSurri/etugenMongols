import { resetPasswordFormMessages } from "../content/ResetPasswordFormMessages";

import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

import { Link } from "react-router-dom";

type ResetPasswordFormProps = {
  language: "en" | "mn";

  token: string;
};

export default function ResetPasswordForm({
  language,
  token,
}: ResetPasswordFormProps) {
  const {
    success,
    mn,
    invalidToken,
    error,
    handleSubmit,
    showPassword,
    password,
    setPassword,
    setError,
    loading,
    setShowPassword,
    showConfirmPassword,
    confirmPassword,
    setConfirmPassword,
    setShowConfirmPassword,
  } = useResetPasswordForm(language, token);

  /*
   * =====================================================
   * SUCCESS STATE
   * =====================================================
   */
  if (success) {
    return (
      <div
        className="
                    py-3
                    text-center
                "
      >
        <div
          className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-[#27301d]/10

                        bg-white

                        text-2xl
                        font-semibold
                        text-[#27301d]
                    "
        >
          ✓
        </div>

        <h2
          className="
                        mt-5
                        text-xl
                        font-semibold
                        text-[#27301d]
                    "
        >
          {resetPasswordFormMessages[mn ? "mn" : "en"].passwordResetSuccessful}
        </h2>

        <p
          className="
                        mt-2
                        text-sm
                        leading-6
                        text-[#667056]
                    "
        >
          {
            resetPasswordFormMessages[mn ? "mn" : "en"]
              .yourPasswordHasBeenUpdatedSuccessfully
          }
        </p>

        <p
          className="
                        mt-5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[#667056]
                    "
        >
          {resetPasswordFormMessages[mn ? "mn" : "en"].redirectingToLogin}
        </p>
      </div>
    );
  }

  /*
   * =====================================================
   * INVALID TOKEN STATE
   * =====================================================
   */
  if (invalidToken) {
    return (
      <div>
        <div
          role="alert"
          className="
                        border-l-2
                        border-[#9a7b26]

                        bg-white

                        px-4
                        py-3

                        text-sm
                        leading-6
                        text-[#667056]
                    "
        >
          {error}
        </div>

        <Link
          to="/auth/forgot-password"
          className="
                        mt-5

                        flex
                        min-h-11
                        w-full
                        items-center
                        justify-center

                        bg-[#27301d]

                        px-6
                        py-3

                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-white

                        no-underline
                        transition-colors

                        hover:bg-[#9a7b26]
                    "
        >
          {resetPasswordFormMessages[mn ? "mn" : "en"].requestNewResetLink}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Password */}
      <div>
        <label
          htmlFor="new-password"
          className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
        >
          {resetPasswordFormMessages[mn ? "mn" : "en"].newPassword}
        </label>

        <div className="relative mt-2">
          <input
            id="new-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder={
              resetPasswordFormMessages[mn ? "mn" : "en"].enterYourNewPassword
            }
            autoComplete="new-password"
            required
            disabled={loading}
            className="
                            h-11
                            w-full

                            border
                            border-[#27301d]/25

                            bg-white

                            px-3.5
                            pr-16

                            text-sm
                            text-[#27301d]

                            outline-none
                            transition-colors

                            placeholder:text-[#667056]/45

                            focus:border-[#9a7b26]

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
          />

          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={loading}
            className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2

                            min-h-9
                            min-w-11
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#667056]

                            transition-colors

                            hover:text-[#9a7b26]

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
          >
            {showPassword
              ? resetPasswordFormMessages[mn ? "mn" : "en"].hide
              : resetPasswordFormMessages[mn ? "mn" : "en"].show}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <label
          htmlFor="confirm-new-password"
          className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
        >
          {resetPasswordFormMessages[mn ? "mn" : "en"].confirmNewPassword}
        </label>

        <div className="relative mt-2">
          <input
            id="confirm-new-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder={
              resetPasswordFormMessages[mn ? "mn" : "en"]
                .enterYourNewPasswordAgain
            }
            autoComplete="new-password"
            required
            disabled={loading}
            className="
                            h-11
                            w-full

                            border
                            border-[#27301d]/25

                            bg-white

                            px-3.5
                            pr-16

                            text-sm
                            text-[#27301d]

                            outline-none
                            transition-colors

                            placeholder:text-[#667056]/45

                            focus:border-[#9a7b26]

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((visible) => !visible)}
            disabled={loading}
            className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2

                            min-h-9
                            min-w-11
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#667056]

                            transition-colors

                            hover:text-[#9a7b26]

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
          >
            {showConfirmPassword
              ? resetPasswordFormMessages[mn ? "mn" : "en"].hide
              : resetPasswordFormMessages[mn ? "mn" : "en"].show}
          </button>
        </div>
      </div>

      {/* Requirements */}
      <div
        className="
                    mt-3
                    text-xs
                    leading-5
                    text-[#667056]/80
                "
      >
        {
          resetPasswordFormMessages[mn ? "mn" : "en"]
            .useAtLeastCharactersWithAnUppercase
        }
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="
                        mt-4

                        border-l-2
                        border-[#9a7b26]

                        bg-white

                        px-4
                        py-2.5

                        text-sm
                        leading-6
                        text-[#667056]
                    "
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
                    mt-5

                    flex
                    min-h-11
                    w-full
                    items-center
                    justify-center

                    bg-[#27301d]

                    px-6
                    py-3

                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white

                    transition-colors

                    hover:bg-[#9a7b26]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:bg-[#27301d]
                "
      >
        {loading
          ? resetPasswordFormMessages[mn ? "mn" : "en"].resettingPassword
          : resetPasswordFormMessages[mn ? "mn" : "en"].resetPassword}
      </button>
    </form>
  );
}
