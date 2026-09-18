import { Link,NavLink } from "react-router-dom";
import type { useAuth } from "../../context/useAuth";
import { NAV_ITEMS,isParentActive,isRouteActive,type UserMenuItem } from "./navigationConfig";
type Props = Pick<ReturnType<typeof useAuth>, "user" | "isLoggedIn" | "loading" | "logout"> & { userMenuItems: UserMenuItem[]; currentPath: string; openMobileGroup: string | null; setOpenMobileGroup: (group: string | null) => void; closeMenu: () => void; handleNavClick: (to: string) => void };
export default function MobileNavigation({ user, isLoggedIn, loading, logout, userMenuItems, currentPath, openMobileGroup, setOpenMobileGroup, closeMenu, handleNavClick }: Props) { return (

        <div
          id="mobile-navigation"
          className="border-t border-[#efe7d4] bg-white px-4 py-4 shadow-[0_18px_45px_rgba(39,48,29,0.08)] xl:hidden"
        >

          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label="Mobile navigation"
          >

            {NAV_ITEMS.map((item) => {

              const hasDropdown =
                Boolean(
                  item.children?.length,
                );

              const isOpen =
                openMobileGroup ===
                item.label;


              if (!hasDropdown) {

                return (

                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() =>
                      handleNavClick(
                        item.to,
                      )
                    }
                    className={({ isActive }) =>
                      [
                        "px-1 py-3 text-base font-semibold no-underline transition-colors",

                        isActive
                          ? "text-[#9a7b26]"
                          : "text-[#27301d]/82 hover:text-[#27301d]",

                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>

                );
              }


              return (

                <div
                  key={item.to}
                  className="border-b border-[#efe7d4]"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroup(
                        isOpen
                          ? null
                          : item.label,
                      )
                    }
                    className={[
                      "flex w-full items-center justify-between px-1 py-3 text-left text-base font-semibold transition-colors",

                      isParentActive(
                        currentPath,
                        item,
                      )
                        ? "text-[#9a7b26]"
                        : "text-[#27301d]/85",

                    ].join(" ")}
                    aria-expanded={isOpen}
                  >

                    <span>
                      {item.label}
                    </span>


                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
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


                  {isOpen && (

                    <div className="pb-3 pl-4">

                      {item.children?.map(
                        (child) => {

                          const childActive =
                            isRouteActive(
                              currentPath,
                              child.to,
                            );


                          return (

                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() =>
                                handleNavClick(
                                  child.to,
                                )
                              }
                              className={[
                                "block px-2 py-2 text-sm font-medium no-underline transition-colors",

                                childActive
                                  ? "text-[#9a7b26]"
                                  : "text-[#27301d]/72 hover:text-[#27301d]",

                              ].join(" ")}
                            >
                              {child.label}
                            </NavLink>

                          );
                        },
                      )}

                    </div>

                  )}

                </div>

              );
            })}


            {/* AUTH - MOBILE */}

            {!loading && (

              <div className="mt-4 border-t border-[#efe7d4] pt-4">

                {isLoggedIn && user ? (

                  <div>

                    <div className="px-1 pb-3">

                      <p className="text-sm font-semibold text-[#27301d]">
                        Hi, {user.firstName}
                      </p>

                    </div>


                    {userMenuItems.map(
                      (item) => (

                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMenu}
                          className="block px-1 py-3 text-base font-semibold text-[#27301d]/82 no-underline transition-colors hover:text-[#27301d]"
                        >
                          {item.label}
                        </Link>

                      ),
                    )}


                    <div className="mt-2 border-t border-[#efe7d4] pt-3">

                      <button
                        type="button"
                        onClick={async () => {

                          closeMenu();

                          await logout();
                        }}
                        className="flex min-h-12 w-full items-center justify-center bg-[#27301d] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#9a7b26]"
                      >
                        Logout
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      to="/auth/login"
                      onClick={closeMenu}
                      className="flex min-h-12 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#27301d] no-underline transition-colors hover:bg-white"
                    >
                      Login
                    </Link>


                    <Link
                      to="/auth/signup"
                      onClick={closeMenu}
                      className="flex min-h-12 items-center justify-center bg-[#27301d] px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white no-underline transition-colors hover:bg-[#9a7b26]"
                    >
                      Sign Up
                    </Link>

                  </div>

                )}

              </div>

            )}

          </nav>

        </div>

      ); }
