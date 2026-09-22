import { Link } from "react-router-dom";
import type { Lang } from "../../context/language";
import type { useAuth } from "../../sections/auth/hooks/useAuth";
import type { UserMenuItem } from "./navigationConfig";
type Props = Pick<
  ReturnType<typeof useAuth>,
  "user" | "isLoggedIn" | "loading" | "logout"
> & { lang: Lang; userMenuItems: UserMenuItem[] };
export default function DesktopAccountControls({
  lang,
  user,
  isLoggedIn,
  loading,
  logout,
  userMenuItems,
}: Props) {
  return (
    <>
      {!loading && (
        <>
          {isLoggedIn && user ? (
            /*
             * Same general footprint as
             * Login + Sign Up.
             *
             * Pure CSS hover dropdown:
             * no extra React state or
             * document event listeners.
             */
            <div className="group relative hidden xl:block">
              <button
                type="button"
                className="
                      inline-flex
                      h-10
                      min-w-[9rem]
                      items-center
                      justify-between
                      gap-3

                      border
                      border-[#e6dcc3]

                      bg-[#fffaf0]

                      px-3

                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#27301d]

                      transition-colors

                      hover:border-[#d8caa5]
                      hover:bg-white
                    "
                aria-haspopup="true"
              >
                <span
                  className="
                        max-w-[7rem]
                        truncate
                      "
                >
                  {lang === "mn" ? "Сайн уу" : "Hi"}, {user.firstName}
                </span>

                <svg
                  className="
                        h-3.5
                        w-3.5
                        shrink-0
                        transition-transform
                        duration-200

                        group-hover:rotate-180
                        group-focus-within:rotate-180
                      "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* USER DROPDOWN */}

              <div
                className="
                      invisible
                      absolute
                      right-0
                      top-full
                      z-50
                      mt-5
                      w-56

                      border
                      border-[#efe7d4]

                      bg-white
                      p-2

                      opacity-0

                      shadow-[0_20px_48px_rgba(39,48,29,0.12)]

                      transition-all
                      duration-150

                      group-hover:visible
                      group-hover:mt-4
                      group-hover:opacity-100
                      group-focus-within:visible
                      group-focus-within:mt-4
                      group-focus-within:opacity-100
                    "
              >
                {/* Hover bridge */}
                <div className="absolute -top-4 left-0 h-4 w-full" />

                {userMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="
                            block
                            px-4
                            py-3

                            text-sm
                            font-semibold
                            text-[#27301d]/80

                            no-underline

                            transition-colors

                            hover:bg-[#fffaf0]
                            hover:text-[#27301d]
                          "
                  >
                    {item.label}
                  </Link>
                ))}

                <div
                  className="
                        my-2
                        border-t
                        border-[#efe7d4]
                      "
                />

                <button
                  type="button"
                  onClick={() => logout()}
                  className="
                        block
                        w-full

                        px-4
                        py-3

                        text-left
                        text-sm
                        font-semibold
                        text-[#27301d]/80

                        transition-colors

                        hover:bg-[#fffaf0]
                        hover:text-[#9a7b26]
                      "
                >
                  {lang === "mn" ? "Гарах" : "Logout"}
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden items-center gap-2 xl:flex">
              <Link
                to="/auth/login"
                className="inline-flex h-10 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#27301d] no-underline transition-colors hover:border-[#d8caa5] hover:bg-white sm:h-11 sm:px-4 sm:text-[12px]"
              >
                {lang === "mn" ? "Нэвтрэх" : "Login"}
              </Link>

              <Link
                to="/auth/signup"
                className="inline-flex h-10 items-center justify-center bg-[#27301d] px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#9a7b26] sm:h-11 sm:px-4 sm:text-[12px]"
              >
                {lang === "mn" ? "Бүртгүүлэх" : "Sign Up"}
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
