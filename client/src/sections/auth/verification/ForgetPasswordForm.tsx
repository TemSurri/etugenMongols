import { forgetPasswordFormMessages } from "../content/ForgetPasswordFormMessages";

import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

type ForgotPasswordFormProps = {
  language: "en" | "mn";
};

export default function ForgotPasswordForm({
  language,
}: ForgotPasswordFormProps) {
  const {
    handleSubmit,
    mn,
    email,
    setEmail,
    error,
    setError,
    loading,
    success,
    cooldown,
  } = useForgotPasswordForm(language);

  /*
   * =====================================================
   * PASSWORD RESET EMAIL COOLDOWN
   * =====================================================
   *
   * After a successful request, wait 60 seconds
   * before allowing another password reset email.
   */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Email */}
      <div>
        <label
          htmlFor="password-reset-email"
          className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
        >
          {forgetPasswordFormMessages[mn ? "mn" : "en"].email}
        </label>

        <input
          id="password-reset-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);

            if (error) {
              setError("");
            }
          }}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={loading}
          className="
                        mt-2
                        h-11
                        w-full

                        border
                        border-[#27301d]/25

                        bg-white

                        px-3.5

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
      </div>

      {/* Password reset request sent */}
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="
                        mt-4

                        border-l-2
                        border-[#667056]

                        bg-white

                        px-4
                        py-3
                    "
        >
          <p
            className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
          >
            {
              forgetPasswordFormMessages[mn ? "mn" : "en"]
                .passwordResetRequestSent
            }
          </p>

          <p
            className="
                            mt-1
                            text-sm
                            leading-6
                            text-[#667056]
                        "
          >
            {
              forgetPasswordFormMessages[mn ? "mn" : "en"]
                .ifAnAccountExistsForThatEmail
            }
          </p>

          <p
            className="
                            mt-2
                            text-xs
                            leading-5
                            text-[#667056]/80
                        "
          >
            {
              forgetPasswordFormMessages[mn ? "mn" : "en"]
                .checkYourInboxAndSpamFolderIf
            }
          </p>
        </div>
      )}

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

      {/* Send password reset link */}
      <button
        type="submit"
        disabled={loading || cooldown > 0}
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
          ? forgetPasswordFormMessages[mn ? "mn" : "en"].sending
          : cooldown > 0
            ? mn
              ? `${cooldown} секундийн дараа дахин илгээх`
              : `Resend in ${cooldown}s`
            : success
              ? forgetPasswordFormMessages[mn ? "mn" : "en"]
                  .sendAnotherResetLink
              : forgetPasswordFormMessages[mn ? "mn" : "en"]
                  .sendPasswordResetLink}
      </button>
    </form>
  );
}
