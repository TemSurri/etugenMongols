import { NavLink } from "react-router-dom";
import { NAV_ITEMS,isParentActive,isRouteActive } from "./navigationConfig";

type Props = { currentPath: string; handleNavClick: (to: string) => void };
export default function DesktopNavigation({currentPath, handleNavClick}: Props) { return (<nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8"
          aria-label="Primary navigation"
        >

          {NAV_ITEMS.map((item) => {

            const hasDropdown =
              Boolean(
                item.children?.length,
              );

            const parentActive =
              isParentActive(
                currentPath,
                item,
              );


            if (!hasDropdown) {

              const itemActive =
                isRouteActive(
                  currentPath,
                  item.to,
                );


              return (

                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() =>
                    handleNavClick(
                      item.to,
                    )
                  }
                  className={[
                    "whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.12em] no-underline transition-colors focus-visible:rounded-sm 2xl:text-[13px] 2xl:tracking-[0.16em]",

                    itemActive
                      ? "text-[#9a7b26]"
                      : "text-[#27301d]/78 hover:text-[#27301d]",

                  ].join(" ")}
                >
                  {item.label}
                </NavLink>

              );
            }


            return (

              <div
                key={item.to}
                className="group relative"
              >

                <button
                  type="button"
                  className={[
                    "inline-flex cursor-default items-center gap-1.5 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.12em] transition-colors focus-visible:rounded-sm 2xl:text-[13px] 2xl:tracking-[0.16em]",

                    parentActive
                      ? "text-[#9a7b26]"
                      : "text-[#27301d]/78 group-hover:text-[#27301d]",

                  ].join(" ")}
                  aria-haspopup="true"
                >

                  {item.label}


                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
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


                <div className="invisible absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 border border-[#efe7d4] bg-white p-2 opacity-0 shadow-[0_20px_48px_rgba(39,48,29,0.12)] transition-all duration-150 group-hover:visible group-hover:mt-4 group-hover:opacity-100 group-focus-within:visible group-focus-within:mt-4 group-focus-within:opacity-100">

                  <div className="absolute -top-4 left-0 h-4 w-full" />


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
                            "block px-4 py-3 text-sm font-semibold no-underline transition-colors",

                            childActive
                              ? "bg-[#fffaf0] text-[#9a7b26]"
                              : "text-[#27301d]/80 hover:bg-[#fffaf0] hover:text-[#27301d]",

                          ].join(" ")}
                        >
                          {child.label}
                        </NavLink>

                      );
                    },
                  )}

                </div>

              </div>

            );
          })}

        </nav>); }
