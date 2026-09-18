import { Link } from "react-router-dom";
import type { useAuth } from "../../context/useAuth";
import type { UserMenuItem } from "./navigationConfig";
type Props = Pick<ReturnType<typeof useAuth>, "user" | "isLoggedIn" | "loading" | "logout"> & { userMenuItems: UserMenuItem[] };
export default function DesktopAccountControls({user, isLoggedIn, loading, logout, userMenuItems}: Props) { return (<>{!loading && (

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
                      h-11
                      min-w-[10.5rem]
                      items-center
                      justify-between
                      gap-3

                      border
                      border-[#e6dcc3]

                      bg-[#fffaf0]

                      px-4

                      text-[11px]
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
                      Hi, {user.firstName}
                    </span>


                    <svg
                      className="
                        h-3.5
                        w-3.5
                        shrink-0
                        transition-transform
                        duration-200

                        group-hover:rotate-180
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

                      shadow-[0_22px_55px_rgba(39,48,29,0.13)]

                      transition-all
                      duration-150

                      group-hover:visible
                      group-hover:mt-4
                      group-hover:opacity-100
                    "
                  >

                    {/* Hover bridge */}
                    <div className="absolute -top-4 left-0 h-4 w-full" />


                    {userMenuItems.map(
                      (item) => (

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

                      ),
                    )}


                    <div
                      className="
                        my-2
                        border-t
                        border-[#efe7d4]
                      "
                    />


                    <button
                      type="button"
                      onClick={() =>
                        logout()
                      }
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
                      Logout
                    </button>

                  </div>

                </div>

              ) : (

                <div className="hidden items-center gap-2 xl:flex">

                  <Link
                    to="/auth/login"
                    className="inline-flex h-11 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#27301d] no-underline transition-colors hover:border-[#d8caa5] hover:bg-white"
                  >
                    Login
                  </Link>


                  <Link
                    to="/auth/signup"
                    className="inline-flex h-11 items-center justify-center bg-[#27301d] px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-[#9a7b26]"
                  >
                    Sign Up
                  </Link>

                </div>

              )}
            </>

          )}</>); }
