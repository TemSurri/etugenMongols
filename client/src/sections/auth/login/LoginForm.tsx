import { loginFormMessages } from "../content/LoginFormMessages";

import { useLoginForm } from "../hooks/useLoginForm";

import { Link } from "react-router-dom";

import type { Language } from "./LoginSection";

type LoginFormProps = {
  language: Language;
};

export default function LoginForm({ language }: LoginFormProps) {
  const {
    handleSubmit,
    mn,
    email,
    setEmail,
    loading,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    error,
    needsVerification,
  } = useLoginForm(language);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#27301d]
                    "
        >
          {loginFormMessages[mn ? "mn" : "en"].email}
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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

      {/* Password */}
      <div className="mt-4">
        <div
          className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
        >
          <label
            htmlFor="password"
            className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#27301d]
                        "
          >
            {loginFormMessages[mn ? "mn" : "en"].password}
          </label>

          <Link
            to="/auth/forgot-password"
            className="
                            text-xs
                            font-medium
                            text-[#667056]

                            no-underline
                            transition-colors

                            hover:text-[#9a7b26]
                        "
          >
            {loginFormMessages[mn ? "mn" : "en"].forgotPassword}
          </Link>
        </div>

        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={loginFormMessages[mn ? "mn" : "en"].enterYourPassword}
            autoComplete="current-password"
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
            aria-label={
              showPassword
                ? loginFormMessages[mn ? "mn" : "en"].hidePassword
                : loginFormMessages[mn ? "mn" : "en"].showPassword
            }
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
              ? loginFormMessages[mn ? "mn" : "en"].hide
              : loginFormMessages[mn ? "mn" : "en"].show}
          </button>
        </div>
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

          {needsVerification && (
            <>
              {" "}
              <Link
                to="/auth/verify-account"
                className="
                                    font-semibold
                                    text-[#27301d]

                                    underline
                                    underline-offset-2

                                    transition-colors

                                    hover:text-[#9a7b26]
                                "
              >
                {loginFormMessages[mn ? "mn" : "en"].verifyAccount}
              </Link>
            </>
          )}
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
          ? loginFormMessages[mn ? "mn" : "en"].signingIn
          : loginFormMessages[mn ? "mn" : "en"].signIn}
      </button>

      {/* Signup */}
      <div
        className="
                    mt-5

                    border-t
                    border-[#27301d]/10

                    pt-4
                    text-center
                "
      >
        <p
          className="
                        text-sm
                        text-[#667056]
                    "
        >
          {loginFormMessages[mn ? "mn" : "en"].donTHaveAnAccount}

          <Link
            to="/auth/signup"
            className="
                            font-semibold
                            text-[#27301d]

                            no-underline
                            transition-colors

                            hover:text-[#9a7b26]
                        "
          >
            {loginFormMessages[mn ? "mn" : "en"].createOne}
          </Link>
        </p>
      </div>
    </form>
  );
}
